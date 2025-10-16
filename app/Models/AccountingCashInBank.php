<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountingCashInBank extends Model
{
    
    protected $fillable = [
        'location',
        'balance',
    ];
}
