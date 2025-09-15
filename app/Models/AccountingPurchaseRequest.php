<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AccountingPurchaseRequest extends Model
{
    protected $fillable = [
        'department',
        'accounting',
        'request_no',
        'date',

    ];
    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
