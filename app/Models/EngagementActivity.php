<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EngagementActivity extends Model
{
    protected $fillable = [
        'name',
        'description',
        'start_at',
        'end_at',
        'status',
    ];

    public function files(): HasMany
    {
        return $this->hasMany(EngagementFile::class, 'news_feed_id', 'id')->where('type', 'activity');
    }
}
