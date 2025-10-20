<?php

namespace App\Http\Controllers;

use App\Models\HRIncidentReport;
use Illuminate\Http\Request;

class HRIncidentReportController extends Controller
{
    public function index()
    {
        $irs = HRIncidentReport::paginate();
        return response()->json($irs, 200);
    }
}
