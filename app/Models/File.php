<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
       protected $fillable = [
        'ticket_id',
        'url',
        'files_from'
    ];

}
