<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuickNotes extends Model
{
    use HasFactory;
    protected $table = 'quick_notes';
    public $timestamps = false;
    protected $fillable = [
        'ticket_id',
        'note',
    ];
}
