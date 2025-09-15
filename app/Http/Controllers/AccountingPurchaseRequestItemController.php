<?php

namespace App\Http\Controllers;

use App\Models\AccountingPurchaseRequestItem;
use Illuminate\Http\Request;

class AccountingPurchaseRequestItemController extends Controller
{
    public function store(Request $request)
    {
        AccountingPurchaseRequestItem::create($request->all());
<<<<<<< HEAD

        return response()->json(['message' => 'created successfully'], 200);
=======
        return response()->json(['message' => 'Created successfully'], 200);
    }
    public function index()
    {
        $cflow = AccountingPurchaseRequestItem::first(); // Get the first record from the model
        return response()->json($cflow, 200); // Return it as a JSON response with 200 OK
>>>>>>> a1ff6f28 ( Purchase Request Data Implemented)
    }
}
