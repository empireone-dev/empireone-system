<?php

namespace App\Http\Controllers;

use App\Models\AccountingPurchaseRequest;
use App\Models\AccountingPurchaseRequestItem;
use Illuminate\Http\Request;

class AccountingPurchaseRequestController extends Controller
{
    public function store(Request $request)
    {
        AccountingPurchaseRequest::create($request->all());
        foreach ($request->items as $key => $value) {
            AccountingPurchaseRequestItem::create([
                "description" => $value['description'],
                "quantity" => $value['quantity'],
                "stock_no" => $value['stock_no'],
                "total_cost" => $value['total_cost'],
                "unit" => $value['unit'],
                "unit_cost" => $value['unit_cost'],
            ]);
        }
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
}
