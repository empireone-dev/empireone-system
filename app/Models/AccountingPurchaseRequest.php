<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class AccountingPurchaseRequest extends Model
{
    protected $fillable = [
        'department',
        'purpose',
        'accounting',
        'requestor_id',
        'request_no',
        'date',
        'priority',
        'status'
    ];
    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
    public function requestor(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'requestor_id');
    }
    public function items(): HasMany
    {
        return $this->hasMany(AccountingPurchaseRequestItem::class, 'accounting_purchase_requests_id', 'id');
    }
}
