<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccountingPurchaseRequestLog;

class AccountingPurchaseRequestLogController extends Controller
{
    /**
     * Store a new status log
     */
    public function store(Request $request, $purchaseRequestId)
    {
        $log = AccountingPurchaseRequestLog::create([
            'accounting_purchase_request_id' => $purchaseRequestId,
            'status' => $request->input('status'), // e.g. 'initial_approved'
            'user_id' => auth()->id(), // or from token/email approver
            'remarks' => $request->input('remarks'),
        ]);

        return response()->json([
            'success' => true,
            'log' => $log,
        ]);
    }
}
