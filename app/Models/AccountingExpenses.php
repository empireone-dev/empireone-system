<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountingExpenses extends Model
{
    protected $fillable = [
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
        'status'
    ];
}
