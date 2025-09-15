<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
<<<<<<< HEAD
=======
use Illuminate\Database\Eloquent\Relations\HasOne;
>>>>>>> a1ff6f28 ( Purchase Request Data Implemented)

class AccountingPurchaseRequest extends Model
{
    protected $fillable = [
<<<<<<< HEAD
=======

>>>>>>> a1ff6f28 ( Purchase Request Data Implemented)
        'department',
        'accounting',
        'request_no',
        'date',
<<<<<<< HEAD
    ];

    // public function items()
    // {
    //     return $this->hasMany(AccountingPurchaseRequestItem::class, 'purchase_request_id');
    // }
}
=======

    ];
    public function user(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
>>>>>>> a1ff6f28 ( Purchase Request Data Implemented)
