<?php

namespace App\Http\Controllers;

use App\Models\AccountingExpenses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AccountingExpensesController extends Controller
{

    public function request_change_status(Request $request)
    {
        $user=Auth::user();
        $transaction = AccountingExpenses::find($request->id);
        if ($transaction) {
            $transaction->update([
                'status' => $request->status,
                'assigned_to' => $user->id,
                'description' => $request->description,
                'receipt_number' => $request->receipt_number,
                'amount' => $request->amount,
                'category' => $request->category,
            ]);
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
        return response()->json($transactions);
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
            // 'category' => $request->input('date'),
            'receipt_number' => $request->receipt_number,
            'amount' => $request->amount,
            'total' => $request->amount,
            // 'credit' => $request->input('date'),
            // 'debit' => $request->input('debit'),
            // 'balance' => $request->input('balance'),
            'files' => $url ?? null,
            'status' => 'Pending',
        ]);
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
