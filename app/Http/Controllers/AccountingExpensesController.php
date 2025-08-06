<?php

namespace App\Http\Controllers;

use App\Models\AccountingExpenses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AccountingExpensesController extends Controller
{
    // List all transactions
    public function index()
    {
        $transactions = AccountingExpenses::all();
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
