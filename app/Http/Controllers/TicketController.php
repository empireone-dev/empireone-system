<?php

namespace App\Http\Controllers;

use App\Events\TicketNotification;
use App\Mail\TicketAnalysisReport;
use App\Models\Activity;
use App\Models\File;
use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class TicketController extends Controller
{
    public function get_account_tickets(Request $request)
    {
        $user = Auth::user();
        $count = $request->query('count', 10);
        $search = $request->query('search');
        $status = $request->query('status');

        $tickets = Ticket::where('location', $user->location)
            ->when($search, function ($query, $search) {
                $query->where('ticket_id',  '=', $search);
            })
            ->when($status, function ($query, $status) {
                $query->where('status', '=', $status);
            })
            ->orderBy('id', 'desc')
            ->with(['assigned_to', 'category', 'site', 'user', 'files', 'notes'])
            ->get($count);

        return response()->json($tickets, 200);
    }
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

        $startDate = Carbon::now()->subDays(7)->startOfDay();
        $endDate = Carbon::now()->endOfDay();

        $query->whereHas('assignees', function ($q) use ($startDate, $endDate) {
            $q->where('status', 'Closed');
            $q->whereBetween('created_at', [$startDate, $endDate]);
        })->with(['assignees' => function ($q) use ($startDate, $endDate) {
            $q->where('status', 'Closed');
            $q->whereBetween('created_at', [$startDate, $endDate]);
        }]);

        $users = $query->get();

        $tickets = $users->map(function ($user) {
            return [
                'user' => $user->name,
                'department' => $user->department,
                'tickets' => $user->assignees->map(function ($ticket) {
                    return [
                        'id' => $ticket->id,
                        'category' => $ticket->category ?? 'Uncategorized',
                        'created_at' => $ticket->created_at->toDateTimeString(),
                        'closed_at' => $ticket->updated_at->toDateTimeString(),
                        // 'resolution' =>$ticket->activities,
                        'resolution' => $ticket->activities->take(2)->map(function ($note) {
                            return Str::limit($note->message ?? '', 200);
                        })->implode("; "),
                    ];
                }),
            ];
        });

        $ticketsArray = $tickets->toArray();
        // return response()->json([
        //     'status' => 'Email sent successfully',
        //     'report' => $ticketsArray,
        // ]);
        $chunks = array_chunk($ticketsArray, 30);
        $results = [];

        foreach ($chunks as $chunk) {
            $ticketsJson = json_encode($chunk, JSON_PRETTY_PRINT);

            $response = Http::timeout(120) // ⏱ prevent timeout
                ->withToken(env('OPENAI_API_KEY'))
                ->withHeaders([
                    'Content-Type' => 'application/json',
                ])
                ->post('https://api.openai.com/v1/chat/completions', [
                    'model' => 'gpt-4o',
                    'messages' => [
                        [
                            'role' => 'system',
                            'content' => "You are an IT operations analyst. Provide a professional WYSIWYG-style HTML report."
                        ],
                        [
                            'role' => 'user',
                            'content' => "Here are the tickets closed in the last 7 days:\n\n$ticketsJson\n\n
                        Please provide a formatted HTML report with:
                        1. Average closing time per person.
                        2. Breakdown by category.
                        3. Most common concerns with the details like monitor issues, mouse issues.
                        4. Review the content/details of the ticket to check what is the most common concern that we have and other things that needs to be checked.
                        5. Check the closed/resolution of the IT on each ticket. I want to know how well they are doing on each ticket. How they cater it. and compare it to ticket content/details.
                        Use <h2>, <table>, <ul>, <p>, etc. No <html>/<body>."
                        ],
                    ],
                ]);

            if ($response->successful()) {
                $htmlReport = trim($response['choices'][0]['message']['content'] ?? '');
                $results[] = $htmlReport;
            } else {
                return response()->json([
                    'error' => 'Failed to process OpenAI request',
                    'message' => $response->json() ?? $response->body(),
                ], $response->status());
            }
        }

        $finalReport = implode("<hr/>", $results);

        $recipients = [
            'harvey@empireonegroup.com',
            'archie@empireonegroup.com'
        ];

        Mail::to($recipients)->send(new TicketAnalysisReport($finalReport));

        return response()->json([
            'status' => 'Email sent successfully',
            'report' => $finalReport,
        ]);
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
