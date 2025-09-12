<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountingPurchaseRequestItem extends Model
{
    protected $fillable = [
        'purchase_request_id',
        'stock_no',
        'description',
        'quantity',
        'unit_cost',
        'total_cost',
    ];

    // public function purchaseRequest()
    // {
    //     return $this->belongsTo(AccountingPurchaseRequest::class, 'purchase_request_id');
    // }
}