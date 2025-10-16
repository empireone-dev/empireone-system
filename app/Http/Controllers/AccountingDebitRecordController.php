<?php

namespace App\Http\Controllers;

use App\Models\AccountingCashFlow;
use App\Models\AccountingCashInBank;
use App\Models\AccountingDebitRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountingDebitRecordController extends Controller
{
    public function index()
    {
        $debit_records = AccountingDebitRecord::orderBy('created_at', 'desc')->get();
        return response()->json($debit_records, 200);
    }
    public function store(Request $request)
    {
        $user = Auth::user();
        $cash_in_bank = AccountingCashInBank::where('id', $request->cash_in_bank_id)->first();
        $cash_flow = AccountingCashFlow::where('location', $user->location)->first();
        if ($cash_in_bank) {
            $cash_in_bank->decrement('balance', $request->amount);
            $cash_flow->increment('total', $request->amount);
            $cash_flow->update([
                'cash_withdrawn' => $request->amount,
            ]);
            AccountingDebitRecord::create([
                ...$request->all(),
                'name' => $user->name,
            ]);
        }

        return response()->json('Debit record created successfully', 200);
    }
}
