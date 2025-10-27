<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EngagementNewsFeed extends Model
{
    protected $fillable = [
        'news_feed_id',
        'type',
        'status',
    ];
}
