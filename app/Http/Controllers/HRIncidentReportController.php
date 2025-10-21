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
    public function show($id)
    {
        $ir = HRIncidentReport::with(['filed_by', 'evidence'])->find($id);
        return response()->json($ir, 200);
    }
}
