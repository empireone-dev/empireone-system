<?php

namespace App\Http\Controllers;

use App\Models\AccountingExpenses;
use Illuminate\Http\Request;

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
        $transaction = AccountingExpenses::create($request->all());
        return response()->json($transaction, 201);
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
