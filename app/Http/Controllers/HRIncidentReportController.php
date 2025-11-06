<?php

namespace App\Http\Controllers;

use App\Models\HRIncidentReport;
use App\Models\HRIncidentReportLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class HRIncidentReportController extends Controller
{
    public function index()
    {
        $irs = HRIncidentReport::with(['filed_by'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);
        return response()->json($irs, 200);
    }
    
    public function show($id)
    {
        $ir = HRIncidentReport::with(['filed_by', 'evidence', 'logs.handler'])->find($id);
        return response()->json($ir, 200);
    }

    /**
     * Validate IR as Valid - Triggers NTE issuance
     */
    public function validateIR(Request $request, $id)
    {
        $request->validate([
            'notes' => 'required|string',
            'nte_file' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:5120'
        ]);

        $ir = HRIncidentReport::findOrFail($id);
        
        $fileUrl = null;
        if ($request->hasFile('nte_file')) {
            $fileUrl = $request->file('nte_file')->store('hr/nte', 's3');
        }

        // Update IR status
        $ir->update(['status' => 'Valid — NTE Served']);

        // Create log entry
        HRIncidentReportLog::create([
            'incident_report_id' => $id,
            'user' => Auth::user()->name,
            'assigned_hr_handler' => Auth::id(),
            'status' => 'Valid — NTE Served',
            'notes' => $request->notes,
            'files' => $fileUrl,
            'due_date' => now()->addDays(5) // 5-day response window
        ]);

        return response()->json(['message' => 'IR validated and NTE served successfully'], 200);
    }

    /**
     * Invalidate IR - Mark as Invalid and close
     */
    public function invalidateIR(Request $request, $id)
    {
        $request->validate([
            'reason' => 'required|string',
            'closure_file' => 'nullable|file|mimes:pdf,doc,docx|max:5120'
        ]);

        $ir = HRIncidentReport::findOrFail($id);
        
        $fileUrl = null;
        if ($request->hasFile('closure_file')) {
            $fileUrl = $request->file('closure_file')->store('hr/closures', 's3');
        }

        $ir->update(['status' => 'Invalid – Closed']);

        HRIncidentReportLog::create([
            'incident_report_id' => $id,
            'user' => Auth::user()->name,
            'assigned_hr_handler' => Auth::id(),
            'status' => 'Invalid – Closed',
            'notes' => 'Reason: ' . $request->reason,
            'files' => $fileUrl
        ]);

        return response()->json(['message' => 'IR marked as invalid and closed'], 200);
    }

    /**
     * Upload Employee Explanation/Response
     */
    public function uploadEmployeeResponse(Request $request, $id)
    {
        $request->validate([
            'response_file' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:5120',
            'notes' => 'nullable|string'
        ]);

        $ir = HRIncidentReport::findOrFail($id);
        
        $fileUrl = $request->file('response_file')->store('hr/employee_responses', 's3');

        $ir->update(['status' => 'Employee Response Submitted']);

        HRIncidentReportLog::create([
            'incident_report_id' => $id,
            'user' => Auth::user()->name,
            'assigned_hr_handler' => Auth::id(),
            'status' => 'Employee Response Submitted',
            'notes' => $request->notes ?? 'Employee explanation received',
            'files' => $fileUrl
        ]);

        return response()->json(['message' => 'Employee response uploaded successfully'], 200);
    }

    /**
     * Schedule Hearing (for grave offenses)
     */
    public function scheduleHearing(Request $request, $id)
    {
        $request->validate([
            'hearing_date' => 'required|date',
            'notes' => 'required|string',
            'hearing_file' => 'nullable|file|mimes:pdf,doc,docx|max:5120'
        ]);

        $ir = HRIncidentReport::findOrFail($id);
        
        $fileUrl = null;
        if ($request->hasFile('hearing_file')) {
            $fileUrl = $request->file('hearing_file')->store('hr/hearings', 's3');
        }

        $ir->update(['status' => 'Hearing Scheduled']);

        HRIncidentReportLog::create([
            'incident_report_id' => $id,
            'user' => Auth::user()->name,
            'assigned_hr_handler' => Auth::id(),
            'status' => 'Hearing Scheduled',
            'notes' => $request->notes . " | Hearing Date: " . $request->hearing_date,
            'files' => $fileUrl
        ]);

        return response()->json(['message' => 'Hearing scheduled successfully'], 200);
    }

    /**
     * Upload NOD (Notice of Decision) and close case
     */
    public function uploadNOD(Request $request, $id)
    {
        $request->validate([
            'nod_file' => 'required|file|mimes:pdf,doc,docx|max:5120',
            'sanction' => 'required|string',
            'notes' => 'nullable|string'
        ]);

        $ir = HRIncidentReport::findOrFail($id);
        
        $fileUrl = $request->file('nod_file')->store('hr/nod', 's3');

        $ir->update(['status' => 'Closed']);

        HRIncidentReportLog::create([
            'incident_report_id' => $id,
            'user' => Auth::user()->name,
            'assigned_hr_handler' => Auth::id(),
            'status' => 'NOD Issued',
            'notes' => 'Sanction: ' . $request->sanction . ' | ' . ($request->notes ?? 'Case closed with NOD'),
            'files' => $fileUrl
        ]);

        return response()->json(['message' => 'NOD uploaded and case closed successfully'], 200);
    }

    /**
     * Generic add log for any workflow step
     */
    public function addLog(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string',
            'notes' => 'required|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:5120'
        ]);

        $fileUrl = null;
        if ($request->hasFile('file')) {
            $fileUrl = $request->file('file')->store('hr/logs', 's3');
        }

        HRIncidentReportLog::create([
            'incident_report_id' => $id,
            'user' => Auth::user()->name,
            'assigned_hr_handler' => Auth::id(),
            'status' => $request->status,
            'notes' => $request->notes,
            'files' => $fileUrl
        ]);

        $ir = HRIncidentReport::findOrFail($id);
        $ir->update(['status' => $request->status]);

        return response()->json(['message' => 'Log added successfully'], 200);
    }
}
