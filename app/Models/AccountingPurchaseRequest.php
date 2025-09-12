<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountingPurchaseRequest extends Model
{
    protected $fillable = [
        'department',
        'accounting',
        'request_no',
        'date',
    ];

    // public function items()
    // {
    //     return $this->hasMany(AccountingPurchaseRequestItem::class, 'purchase_request_id');
    // }
}