<?php

namespace App\Http\Controllers;

use App\Models\AccountingPurchaseRequestItem;
use Illuminate\Http\Request;

class AccountingPurchaseRequestItemController extends Controller
{
    public function store(Request $request)
    {
        AccountingPurchaseRequestItem::create($request->all());

        return response()->json(['message' => 'created successfully'], 200);
    }
}
