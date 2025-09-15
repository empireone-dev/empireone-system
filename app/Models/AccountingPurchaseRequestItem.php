<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountingPurchaseRequestItem extends Model
{
    protected $fillable = [


        'stock_no',
        'unit',
        'description',
        'quantity',
        'unit_cost',
        'total_cost',
    ];
}
