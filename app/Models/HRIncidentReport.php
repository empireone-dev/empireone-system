<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class HRIncidentReport extends Model
{
    protected $fillable = [
        'violator',
        'email',
        'manager_tl_name',  // ✅ ADD THIS
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

    protected $attributes = [
        'status' => 'IR Submitted',  // Default status
    ];

    public function filed_by(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'filed_by');
    }

    public function evidence(): HasMany
    {
        return $this->hasMany(HREvidence::class, 'incident_report_id', 'id');
    }

    public function logs(): HasMany
    {
        return $this->hasMany(HRIncidentReportLog::class, 'incident_report_id', 'id')->orderBy('created_at', 'asc');
    }
}
