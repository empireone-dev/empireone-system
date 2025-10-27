<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EngagementActivity extends Model
{
    protected $fillable = [
        'name',
        'description',
        'start_at',
        'end_at',
        'status',
    ];
}
