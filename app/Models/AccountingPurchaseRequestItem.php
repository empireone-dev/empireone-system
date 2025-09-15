<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccountingPurchaseRequestItem extends Model
{
    protected $fillable = [
<<<<<<< HEAD
        'purchase_request_id',
        'stock_no',
=======


        'stock_no',
        'unit',
>>>>>>> a1ff6f28 ( Purchase Request Data Implemented)
        'description',
        'quantity',
        'unit_cost',
        'total_cost',
    ];
<<<<<<< HEAD

    // public function purchaseRequest()
    // {
    //     return $this->belongsTo(AccountingPurchaseRequest::class, 'purchase_request_id');
    // }
}
=======
}
>>>>>>> a1ff6f28 ( Purchase Request Data Implemented)
