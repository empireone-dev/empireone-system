<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountingPurchaseRequestLog extends Model
{
    
     protected $fillable = [
        'accounting_purchase_requests_id',
        'user',
        'status',
        'files',
        'notes',
        'payment_method'
    ];
}
