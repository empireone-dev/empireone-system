<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityUpload extends Model
{
    protected $fillable = [
       'activity_id',
       'file',    
    ];
}
