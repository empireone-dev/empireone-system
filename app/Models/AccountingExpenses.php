<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AccountingExpenses extends Model
{
    protected $fillable = [
        'user_id',
        'assigned_to',
        'date',
        'site',
        'quantity',
        'description',
        'category',
        'receipt_number',
        'amount',
        'total',
        'tin',
        'files',
        'status',
        'payment_method',
    ];
       public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
