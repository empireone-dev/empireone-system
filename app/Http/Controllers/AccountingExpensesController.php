<?php

namespace App\Http\Controllers;

use App\Models\AccountingCashFlow;
use App\Models\AccountingExpenses;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AccountingExpensesController extends Controller
{

    public function get_expenses_report(Request $request)
    {
        $month = $request->month ?? now()->format('m');
        $year = $request->year ?? now()->format('Y');

        // First and last day of given month
        $startDate = Carbon::createFromDate($year, $month, 1)->startOfDay();
        $endDate = Carbon::createFromDate($year, $month, 1)->endOfMonth()->endOfDay();


        $transactions = AccountingExpenses::whereRaw(
            "STR_TO_DATE(`date`, '%M %e, %Y %l:%i %p') BETWEEN ? AND ?",
            [$startDate, $endDate]
        )
            ->where('status', 'Approved')
            ->orderByRaw("STR_TO_DATE(`date`, '%M %e, %Y %l:%i %p') asc")
            ->with(['user'])
            ->get();

        return response()->json($transactions, 200);
    }



    public function get_daily_expenses(Request $request)
    {
        $today = Carbon::today()->toDateString();

        $transactions = AccountingExpenses::where('status', 'Approved')
            ->where('payment_method', $request->query('payment_method', 'Cash'))
            ->orderBy('date', 'asc')
            ->with(['user'])
            ->get()
            ->filter(function ($expense) use ($today) {
                $parsedDate = Carbon::parse($expense->created_at)->toDateString();
                return $parsedDate == $today;
            })
            ->values(); 

        return response()->json($transactions, 200);
    }
    public function request_change_status(Request $request)
    {
        $user = Auth::user();
        $transaction = AccountingExpenses::find($request->id);
        if ($transaction) {
            $transaction->update([
                'status' => $request->status,
                'assigned_to' => $user->id,
                'description' => $request->description,
                'receipt_number' => $request->receipt_number,
                'amount' => $request->amount,
                'category' => $request->category,
                'payment_method' => $request->payment_method,
            ]);

            $cash_flow =  AccountingCashFlow::where('id', 1)->first();
            if ($request->status == 'Approved' && $cash_flow) {
                $cash_flow->update([
                    'total' => $cash_flow->total - $request->amount,
                ]);
            }
            return response()->json(['message' => 'Status updated successfully'], 200);
        }
        return response()->json(['message' => 'Transaction not found'], 404);
    }

    public function my_fund_request()
    {
        $user = Auth::user();
        $transactions = AccountingExpenses::where('user_id', $user->id)->with(['user'])->orderBy('id', 'desc')->paginate();
        return response()->json($transactions, 200);
    }
    public function index(Request $request)
    {
        $transactions = AccountingExpenses::where('status', $request->status)->orderBy('date', 'asc')->with(['user'])->paginate();
        return response()->json($transactions, 200);
    }

    // Store a new transaction
    public function store(Request $request)
    {
        $user = Auth::user();
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store(date("Y"), 's3');
            $url = Storage::disk('s3')->url($path);
        }
        $account_expenses = AccountingExpenses::create([
            'date' => $request->date,
            'site' => $user->site_id,
            'user_id' => $user->id,
            'description' => $request->description,
            'receipt_number' => $request->receipt_number,
            'amount' => $request->amount,
            'total' => $request->amount,
            'tin' => $request->tin,
            'files' => $url ?? null,
            'status' => $request->status ?? 'Pending',
            'payment_method' => $request->payment_method ?? 'Cash',
        ]);
        if ($request->status == 'Approved') {
            AccountingCashFlow::where('location', $user->location)->decrement('total', $request->amount);
        }
        return response()->json($account_expenses, 200);
    }

    // Show a single transaction
    public function show(AccountingExpenses $transaction)
    {
        return response()->json($transaction);
    }

    // Update a transaction
    public function update(Request $request, AccountingExpenses $transaction)
    {
        $transaction->update($request->all());
        return response()->json($transaction);
    }

    // Delete a transaction
    public function destroy(AccountingExpenses $transaction)
    {
        $transaction->delete();
        return response()->json(null, 204);
    }
}
