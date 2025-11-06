<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HRIncidentReportLog extends Model
{
    protected $fillable = [    
        'incident_report_id',  // Changed from h_r_incident_report_id
        'user',
        'notes',
        'files',
        'status'
    ];

    public function incidentReport(): BelongsTo
    {
        return $this->belongsTo(HRIncidentReport::class, 'incident_report_id');
    }
}
