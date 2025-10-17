<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HRIncidentReport extends Model
{

    protected $fillable = [
        'violator',
        'date',
        'witness',
        'details',
        'notes',
        'violation',
        'infraction',
        'files',
    ];
}
