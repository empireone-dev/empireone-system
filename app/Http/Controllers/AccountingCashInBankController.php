<?php

namespace App\Http\Controllers;

use App\Models\AccountingCashInBank;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountingCashInBankController extends Controller
{

    public function index()
    {
        $auth  = Auth::user();
        $cashInBank = AccountingCashInBank::where('location', $auth->location)->first();
        return response()->json($cashInBank, 200);
    }

    public function update(Request $request, $id)
    {
        $cflow = AccountingCashInBank::find($id);
        if (!$cflow) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $validatedData = $request->validate([
            'balance' => 'required',
        ]);

        $cflow->update($validatedData);

        return response()->json($cflow, 200);
    }
}
