<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountingCashFlow extends Model
{
    protected $fillable = [
        'starting_balance',
        'cash_withdrawn',
        'total',
    ];
}
