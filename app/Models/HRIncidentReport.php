<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class HRIncidentReport extends Model
{

    protected $fillable = [
        'violator',
        'date',
        'filed_by',
        'witness',
        'details',
        'notes',
        'violation',
        'infraction',
        'files',
        'status',
    ];

    public function filed_by(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'filed_by');
    }
    public function evidence(): HasMany
    {
        return $this->hasMany(HREvidence::class, 'incident_report_id', 'id');
    }
}
