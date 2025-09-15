<?php

namespace App\Http\Controllers;

use App\Models\AccountingPurchaseRequest;
<<<<<<< HEAD
use App\Models\AccountingPurchaseRequestItem;
=======
>>>>>>> a1ff6f28 ( Purchase Request Data Implemented)
use Illuminate\Http\Request;

class AccountingPurchaseRequestController extends Controller
{
    public function store(Request $request)
    {
<<<<<<< HEAD
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
=======
        AccountingPurchaseRequest::create($request->all());
        return response()->json(['message' => 'Created successfully'], 200);
    }
    public function index()
    {
        $cflow = AccountingPurchaseRequest::first(); // Get the first record from the model
        return response()->json($cflow, 200); // Return it as a JSON response with 200 OK
    }

    // public function update(Request $request, $id)
    // {
    //     $cflow = AccountingPurchaseRequest::find($id);
    //     if (!$cflow) {
    //         return response()->json(['message' => 'Record not found'], 404);
    //     }

    //     $validatedData = $request->validate([
    //         'starting_balance' => 'required',
    //         'cash_withdrawn' => 'required',
    //         'total' => 'required',
    //     ]);

    //     $cflow->update($validatedData);

    //     return response()->json($cflow, 200);
    // }
>>>>>>> a1ff6f28 ( Purchase Request Data Implemented)
}
