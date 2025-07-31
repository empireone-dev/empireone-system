<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;




class DashboardController extends Controller
{
    public function departments()
    {
        $departments = [
            [
                "label" => "IT Department",
                "value" => "IT Department",
            ],
            [
                "label" => "HR Department",
                "value" => "HR Department",
            ],
            [
                "label" => "QA Department",
                "value" => "QA Department",
            ],
            [
                "label" => "Operations Department",
                "value" => "Operations Department",
            ],
            [
                "label" => "Compliance Department",
                "value" => "Compliance Department",
            ],
            [
                "label" => "Accounting Department",
                "value" => "Accounting Department",
            ],
            [
                "label" => "Engagement Department",
                "value" => "Engagement Department",
            ],
        ];
        return $departments;
    }
    public function index(Request $request)
    {
        // This method can be used to return a view or data for the dashboard
        $user = Auth::user();
        if ($user->account_type == '1') {
            if ($request->location) {
                $location = $request->location == 'carcar' ? 'Carcar' : 'San Carlos';

                $departmentStats = [];

                foreach ($this->departments() as $department) {
                    $deptValue = trim($department['value']); // Clean value

                    $internal_pending = Ticket::where([
                        ['location', $location],
                        ['status', 'Pending'],
                        ['department', $deptValue]
                    ])->count();

                    $internal_declined = Ticket::where([
                        ['location', $location],
                        ['status', 'Declined'],
                        ['department', $deptValue]
                    ])->count();
                    $internal_closed = Ticket::where([
                        ['location', $location],
                        ['status', 'Closed'],
                        ['department', $deptValue]
                    ])->count();

                    $internal_overall = Ticket::where([
                        ['location', $location],
                        ['department', $deptValue]
                    ])->count();

                    // Append result
                    $departmentStats[] = [
                        'department' => $deptValue,
                        'internal_declined' => $internal_declined,
                        'internal_pending' => $internal_pending,
                        'internal_closed' => $internal_closed,
                        'internal_overall' => $internal_overall,
                    ];
                }

                // Return as JSON response
                return response()->json($departmentStats);
            }
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
