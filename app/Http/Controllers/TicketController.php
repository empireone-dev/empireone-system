<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\File;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class TicketController extends Controller
{

    public function show($ticket_id)
    {
        $ticket = Ticket::where('ticket_id', $ticket_id)->with(['assigned_to', 'user', 'category', 'site', 'activities','notes'])->first();
        return response()->json($ticket, 200);
    }


    public function index(Request $request)
    {
        $search = $request->query('search');

        $tickets = Ticket::where('location', $request->location)
            ->with(['user', 'assigned_to'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('ticket_id', 'like', "%{$search}%");
                    $q->orWhere('status', 'like', "%{$search}%");
                });
            })
            ->orderBy('id', 'desc')
            ->paginate(10);

        return response()->json($tickets, 200);
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $ticket = Ticket::create([
            'site_id' =>  $request->site_id,
            'user_id' => $user->id,
            'category_id' => intval($request->category_id),
            'details' => $request->details,
            'station' => $request->station,
            'location' => $user->location,
            'status' => 'Pending',
            'isUrgent' => $request->isUrgent,
            'start' => $request->start,
            'end' => $request->end,
            'department' => $request->department,
        ]);
        $length = strlen($ticket->id);

        if ($length == 1) {
            $id = date("dmy") . '00000' . $ticket->id;
        } else if ($length == 2) {
            $id = date("dmy") . '0000' . $ticket->id;
        } else if ($length == 3) {
            $id = date("dmy") . '000' . $ticket->id;
        } else {
            $id = date("dmy") . str_pad($ticket->id, 6, '0', STR_PAD_LEFT);
        }
        $ticket->update([
            'ticket_id' => 'IT' . $id
        ]);
        Activity::create([
            'ticket_id' => $ticket->id,
            'user_id' => $user->id,
            'message' => 'created new ' . $request->isUrgent . 'ticket',
            'type' => 'create',
        ]);
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $uploadedFile) {
                $path = $uploadedFile->store(date("Y"), 's3');
                $url = Storage::disk('s3')->url($path);
                File::create([
                    'ticket_id' => $ticket->id,
                    'url' => $url,
                    'files_from' => 'Ticketing'
                ]);
            }
        }
        // $message = $ticket;
        // event(new OpenTicketNotification($message));
        // $user = User::where('id', $request->assigned_to)->first();
        // Mail::to($user->email)->send(new NewIncommingTicket([
        //     'ticket_id' => $ticket->ticket_id,
        //     'details' => $ticket->details,
        // ]));
        return response()->json([
            'result' => 'success',
        ], 200);
    }
}
