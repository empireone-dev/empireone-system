<?php

namespace App\Http\Controllers;

use App\Events\MessageRealTime;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoteController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::user();
        $n = Note::create([
            'ticket_id' => $request->id,
            'user_id' => $user->id,
            'notes' => $request->notes,
        ]);
        $note = Note::with(['user', 'ticket'])->find($n->id);
        event(new MessageRealTime($note));
        return response()->json('success', 200);
    }
}
