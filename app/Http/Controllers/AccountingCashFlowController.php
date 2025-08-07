<?php

namespace App\Http\Controllers;

use App\Models\AccountingCashFlow;
use Illuminate\Http\Request;

class AccountingCashFlowController extends Controller
{
    public function index()
    {
        $cflow = AccountingCashFlow::first(); // Get the first record from the model
        return response()->json($cflow, 200); // Return it as a JSON response with 200 OK
    }
}
