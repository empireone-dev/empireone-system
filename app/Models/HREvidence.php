<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HREvidence extends Model
{
    protected $fillable = [
        'incident_report_id',
        'file',
        'type',
    ];
}
