<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountingDebitRecord extends Model
{
    protected $fillable = [
        'cash_in_bank_id',
        'name',
        'description',
        'amount',
    ];
}
