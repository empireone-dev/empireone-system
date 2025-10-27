<?php

namespace App\Http\Controllers;

use App\Models\EngagementCalendar;
use Illuminate\Http\Request;

class EngagementCalendarController extends Controller
{
    public function index()
    {
        $currentYear = now()->year;
        $activity = EngagementCalendar::whereYear('created_at', $currentYear)
            ->where('type', 'activity')
            ->with(['activity'])
            ->get();

        $calendars = [
            ...$activity,
        ];

        return response()->json($calendars, 200);
    }


    public function show($id)
    {
        return response()->json(['message' => 'Details of engagement calendar ' . $id]);
    }
}
