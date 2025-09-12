<?php

namespace App\Http\Controllers;

use App\Events\TicketNotification;
use App\Models\Activity;
use App\Models\File;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class TicketController extends Controller
{
    public function get_stats(Request $request)
    {
        $query = User::query();

        // Filter by location
        if (!empty($request->location)) {
            $query->where('location', $request->location);
        }

        // Filter by department
        if (!empty($request->department)) {
            $query->where('department', $request->department);
        }

        // Apply date filter on assignees if date range is provided
        if (!empty($request->start_date) && !empty($request->end_date)) {
            $query->whereHas('assignees', function ($q) use ($request) {
                $q->where('status', 'Closed');
                $q->whereBetween('created_at', [$request->start_date, $request->end_date]);
            })->with(['assignees' => function ($q) use ($request) {
                $q->where('status', 'Closed');
                $q->whereBetween('created_at', [$request->start_date, $request->end_date]);
            }]);
        } else {
            // Only include users who have assignees, but don't load them
            $query->whereHas('assignees');
        }

        $users = $query->get();

        return response()->json($users, 200);
    }



    public function change_ticket_status(Request $request)
    {
        $user = Auth::user();
        $ticket = Ticket::where('ticket_id', $request->ticket_id)->first();
        if ($ticket) {
            $ticket->update([
                'status' => $request->status,
                'assigned_to' => $user->id,
            ]);

            Activity::create([
                'ticket_id' => $ticket->id,
                'user_id' => $user->id,
                'message' => 'Ticket status changed to <strong>' . strtoupper($request->status) . '</strong>, ' . $request->notes,
                'type' => 'status_change',
            ]);

            // event(new TicketNotification($ticket));
        }

        return response()->json(['message' => 'Ticket status updated successfully'], 200);
    }
    public function assign_ticket(Request $request)
    {
        $user = Auth::user();
        $ticket = Ticket::where('ticket_id', $request->ticket_id)->first();
        if ($ticket) {
            $ticket->update([
                'department' => $request->department,
            ]);

            Activity::create([
                'ticket_id' => $ticket->id,
                'user_id' => $user->id,
                'message' => 'Ticket assigned to ' . $request->department,
                'type' => 'reassigned',
            ]);

            event(new TicketNotification($ticket));
        }



        return response()->json(['message' => 'Ticket assigned successfully'], 200);
    }
    public function get_tickets_by_internal(Request $request)
    {
        $user = Auth::user();
        $search = $request->query('search');
        $status = $request->query('status');

        $tickets = Ticket::where([
            // ['site_id', $user->site_id],
            ['location', $user->location],
            ['department', $user->department],
        ])
            ->when($search, function ($query, $search) {
                $query->where('ticket_id', '=', $search);
            })
            ->when($status, function ($query, $status) {
                $user = Auth::user();
                if ($status == 'Assigned') {
                    $query->where('assigned_to', '=', $user->id);
                } else {
                    $query->where('status', '=', $status);
                }
            })
            ->with(['assigned_to', 'category', 'site', 'user'])
            ->orderBy('id', 'desc')
            ->paginate(10);

        return response()->json($tickets, 200);
    }

    public function get_tickets_by_user(Request $request)
    {
        $user = Auth::user();
        $search = $request->query('search');
        $status = $request->query('status');

        $tickets = Ticket::where('user_id', $user->id)
            ->when($search, function ($query, $search) {
                $query->where('ticket_id',  '=', $search);
            })
            ->when($status, function ($query, $status) {
                $query->where('status', '=', $status);
            })
            ->orderBy('id', 'desc')
            ->with(['assigned_to', 'category', 'site', 'user'])
            ->paginate(10);

        return response()->json($tickets, 200);
    }

    public function show($ticket_id)
    {
        $ticket = Ticket::where('ticket_id', $ticket_id)->with(['assigned_to', 'user', 'category', 'site', 'activities', 'notes', 'files'])->first();
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
                    $q->orWhereHas('user', function ($q2) use ($search) {
                        $q2->where('name', 'like', "%{$search}%");
                    });
                    $q->orWhereHas('assigned_to', function ($q2) use ($search) {
                        $q2->where('name', 'like', "%{$search}%");
                    });
                });
            })
            ->orderBy('id', 'desc')
            ->paginate(10);

        return response()->json($tickets, 200);
    }


    public function send_auto_email(Request $request)
    {
        $query = User::query();

        if (!empty($request->location)) {
            $query->where('location', $request->location);
        }

        if (!empty($request->department)) {
            $query->where('department', "IT Department");
        }

        $startDate = Carbon::now()->subDays(15)->startOfDay();
        $endDate = Carbon::now()->endOfDay();

        $query->whereHas('assignees', function ($q) use ($startDate, $endDate) {
            $q->where('status', 'Closed');
            $q->whereBetween('created_at', [$startDate, $endDate]);
        })->with(['assignees' => function ($q) use ($startDate, $endDate) {
            $q->where('status', 'Closed');
            $q->whereBetween('created_at', [$startDate, $endDate]);
        }]);

        $users = $query->get();

        // Convert users collection to JSON
        $ticketsJson = $users->toJson(JSON_PRETTY_PRINT);

        $response = Http::withToken(env('OPENAI_API_KEY'))
            ->withHeaders([
                'Content-Type' => 'application/json',
            ])
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => "You are an IT operations analyst. Analyze the given tickets and return a structured JSON report."
                    ],
                    [
                        'role' => 'user',
                        'content' => "Here are the tickets closed in the last 15 days:\n\n$ticketsJson\n\n
                    Please provide:
                    1. Average closing time per person.
                    2. Breakdown by category (especially Network Issues).
                    3. Most common concerns.
                    4. Review IT resolutions and compare them to ticket details.
                    
                    Return the result in JSON format with fields: average_time_per_person, categories, common_concerns, resolution_review."
                    ],
                ],
                'max_tokens' => 1000,
            ]);

        if ($response->successful()) {
            $rawOutput = trim($response['choices'][0]['message']['content'] ?? '');

            // Try to decode JSON
            $data = json_decode($rawOutput, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                return response()->json([
                    'result' => $data,
                ]);
            } else {
                // fallback: return raw text if JSON decoding fails
                return response()->json([
                    'result' => $rawOutput,
                ]);
            }
        } else {
            return response()->json([
                'error' => 'Failed to process OpenAI request',
                'message' => $response->json() ?? $response->body(),
            ], $response->status());
        }
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
            'location' => in_array($request->site_id, [1, 3, 4]) ? "San Carlos" : "Carcar",
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
            'message' => 'created new ' . $request->isUrgent . ' ticket',
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
        event(new TicketNotification($ticket));
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
