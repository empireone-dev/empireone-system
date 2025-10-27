<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EngagementFile extends Model
{
    protected $fillable = [
        'news_feed_id',
        'files',
        'type',
    ];
}
