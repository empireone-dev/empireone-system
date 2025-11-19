<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'middle_name',
        'suffix',
        'date_of_birth',
        'city',
        'province',
        'street',
        'zip_code',
        'address',
        'status',
        'hired_date',
        'civil_status',
        'gender',
        'nationality',
        'contact_number',
        'religion',
        'mother_name',
        'father_name',
        'emergency_contact_person',
        'emergency_contact_number',
        'emergency_contact_address',
        'emergency_contact_relationship',
        'educational_background',
        'course',
        'school_name',
        'sss',
        'tin',
        'philhealth',
        'pagibig',
    ];
}
