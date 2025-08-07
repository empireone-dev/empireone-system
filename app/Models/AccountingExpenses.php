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
        'credit',
        'debit',
        'balance',
        'files',
        'status',
    ];
       public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
