<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
        Note::create([
            'ticket_id' => $request->id,
            'user_id' => $user->id,
            'notes' => $request->notes,
        ]);
        return response()->json('success', 200);
    }
}
