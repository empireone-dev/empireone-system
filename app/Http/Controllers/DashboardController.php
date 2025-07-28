<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        // This method can be used to return a view or data for the dashboard
        $user = Auth::user();
        if ($user->account_type == '1') {
            # code...
        } else if ($user->account_type == '2') {
            $my_pending = Ticket::where([
                ['user_id', $user->id],
                ['status', 'Pending']
            ])
                ->count();
            $my_closed = Ticket::where([
                ['user_id', $user->id],
                ['status', 'Closed']
            ])
                ->count();
            $my_overall = Ticket::where('user_id', $user->id)
                ->count();

            $ticket_assigned = Ticket::where('assigned_to', $user->id)
                ->count();
            $internal_pending = Ticket::where([
                ['department', $user->department],
                ['location', $user->location],
                ['status', 'Pending']
            ])
                ->count();
            $internal_closed = Ticket::where([
                ['department', $user->department],
                ['location', $user->location],
                ['status', 'Closed']
            ])
                ->count();
            $internal_overall = Ticket::where([
                ['department', $user->department],
                ['location', $user->location],
            ])
                ->count();
            return response()->json(
                [
                    'my_pending' => $my_pending,
                    'my_closed' => $my_closed,
                    'my_overall' => $my_overall,
                    'ticket_assigned' => $ticket_assigned,
                    'internal_pending' => $internal_pending,
                    'internal_closed' => $internal_closed,
                    'internal_overall' => $internal_overall,
                ]
            );
        }
    }
}
