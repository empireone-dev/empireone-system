<?php

namespace App\Http\Controllers;

use App\Models\AccountingPurchaseRequest;
use App\Models\AccountingPurchaseRequestItem;
use Illuminate\Http\Request;

class AccountingPurchaseRequestController extends Controller
{
    public function store(Request $request)
    {
        // Validate first
       

        // Save main purchase request
        $purchaseRequest = AccountingPurchaseRequest::create([
            'department' => $request->department,
            'accounting' => $request->accounting,
            'request_no' =>$request->request_no,
            'date' =>$request->date,
        ]);


        foreach ($request->items as $key => $value) {
            AccountingPurchaseRequestItem::create([ 
                   'purchase_request_id'=> $purchaseRequest->id,
                    'stock_no'=>$value['stock_no'],
                    'description'=>$value['description'],
                    'quantity'=>$value['quantity'],
                    'unit_cost'=>$value['unit_cost'],
                    'total_cost'=>$value['total_cost'],
            ]);
        }

        return response()->json([
            'message' => 'Created successfully',
        ], 200);
    }
}
