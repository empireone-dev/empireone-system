<?php

namespace App\Http\Controllers;

use App\Models\HRIncidentReport;
use App\Models\HRIncidentReportLog;
use App\Mail\HRIncidentReportNTEMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Carbon\Carbon;
use Inertia\Inertia;  

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
        $ir = HRIncidentReport::with(['filed_by', 'evidence', 'logs'])->find($id);
        return response()->json($ir, 200);
    }

    public function validateIR(Request $request, $id)
    {
        $validated = $request->validate([
            'notes' => 'required|string',
            'nte_file' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:5120',
            'employee_email' => 'required|email',
            'response_days' => 'nullable|numeric|min:1|max:30',
        ]);

        $ir = HRIncidentReport::with('filed_by')->findOrFail($id);
        
        $fileUrl = null;
        $filePath = null;
        if ($request->hasFile('nte_file')) {
            $filePath = $request->file('nte_file')->store('hr/nte', 's3');
            $fileUrl = Storage::disk('s3')->url($filePath);
        }

        $ir->update(['status' => 'Valid — NTE Served']);

        // Create a summary instead of storing full HTML
        $noteSummary = 'NTE has been served to the employee. Response deadline: ' . 
                       ((int)($validated['response_days'] ?? 5)) . ' business days.';
        
        if ($fileUrl) {
            $noteSummary .= ' NTE document attached.';
        }

        HRIncidentReportLog::create([
            'incident_report_id' => $id,
            'user' => Auth::user()->name,
            'status' => 'Valid — NTE Served',
            'notes' => $noteSummary, // Short summary
            'files' => $fileUrl, // File URL for viewing
        ]);

        // Send NTE email to employee
        $responseDays = (int)($validated['response_days'] ?? 5);
        $responseDeadline = Carbon::now()->addWeekdays($responseDays);
        
        $responseUrl = URL::temporarySignedRoute(
            'hr.incident-report.respond',
            $responseDeadline,
            ['id' => $id]
        );

        $mailData = [
            'ir_id' => $ir->id,
            'violator' => $ir->violator,
            'incident_date' => $ir->date,
            'location' => $ir->filed_by->location ?? 'N/A',
            'infraction' => $ir->infraction,
            'notes' => strip_tags($validated['notes']), // Clean HTML for email
            'response_deadline' => $responseDeadline,
            'response_days' => $responseDays,
            'responseUrl' => $responseUrl,
            'nte_file_path' => $filePath,
        ];

        Mail::to($validated['employee_email'])->send(new HRIncidentReportNTEMail($mailData));

        return response()->json([
            'message' => 'IR validated, NTE served, and email sent to employee successfully',
            'email_sent_to' => $validated['employee_email']
        ], 200);
    }

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
            'status' => 'Invalid – Closed',
            'notes' => 'Reason: ' . $request->reason,
            'files' => $fileUrl
        ]);

        return response()->json(['message' => 'IR marked as invalid and closed'], 200);
    }

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
            'status' => 'Employee Response Submitted',
            'notes' => $request->notes ?? 'Employee explanation received',
            'files' => $fileUrl
        ]);

        return response()->json(['message' => 'Employee response uploaded successfully'], 200);
    }

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
            'status' => 'Hearing Scheduled',
            'notes' => $request->notes . " | Hearing Date: " . $request->hearing_date,
            'files' => $fileUrl
        ]);

        return response()->json(['message' => 'Hearing scheduled successfully'], 200);
    }

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
            'status' => 'NOD Issued',
            'notes' => 'Sanction: ' . $request->sanction . ' | ' . ($request->notes ?? 'Case closed with NOD'),
            'files' => $fileUrl
        ]);

        return response()->json(['message' => 'NOD uploaded and case closed successfully'], 200);
    }

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
            'status' => $request->status,
            'notes' => $request->notes,
            'files' => $fileUrl
        ]);

        $ir = HRIncidentReport::findOrFail($id);
        $ir->update(['status' => $request->status]);

        return response()->json(['message' => 'Log added successfully'], 200);
    }

    public function showResponseForm(Request $request, $id)
    {
        // Validate the signed URL
        if (!$request->hasValidSignature()) {
            abort(403, 'This response link has expired or is invalid.');
        }

        $ir = HRIncidentReport::with(['filed_by', 'logs'])->findOrFail($id);

        // Check if employee has already responded
        $hasResponded = HRIncidentReportLog::where('incident_report_id', $id)
            ->where('status', 'Employee Response Submitted')
            ->exists();

        return Inertia::render('hr/incident_report_response/page', [
            'incident_report' => $ir,
            'has_responded' => $hasResponded,
        ]);
    }

    public function submitEmployeeResponse(Request $request, $id)
    {
        $validated = $request->validate([
            'employee_name' => 'required|string|max:255',
            'employee_email' => 'required|email',
            'explanation' => 'required|string|min:50',
            'response_file' => 'nullable|file|mimes:pdf,doc,docx,jpg,png|max:5120'
        ]);

        $ir = HRIncidentReport::findOrFail($id);

        // Check if already responded
        $hasResponded = HRIncidentReportLog::where('incident_report_id', $id)
            ->where('status', 'Employee Response Submitted')
            ->exists();

        if ($hasResponded) {
            return response()->json(['message' => 'You have already submitted a response.'], 400);
        }

        // Save the written explanation as a text file
        $cleanExplanation = strip_tags($validated['explanation']);
        $explanationFileName = 'hr/employee_responses/explanation_' . $id . '_' . time() . '.txt';
        Storage::disk('s3')->put($explanationFileName, $cleanExplanation);
        $explanationUrl = Storage::disk('s3')->url($explanationFileName);

        // Save supporting documents if uploaded
        $supportingDocUrl = null;
        if ($request->hasFile('response_file')) {
            $supportingDocUrl = $request->file('response_file')->store('hr/employee_responses', 's3');
            $supportingDocUrl = Storage::disk('s3')->url($supportingDocUrl);
        }

        $ir->update(['status' => 'Employee Response Submitted']);

        // Create first log entry for written explanation
        HRIncidentReportLog::create([
            'incident_report_id' => $id,
            'user' => $validated['employee_name'] . ' (' . $validated['employee_email'] . ')',
            'status' => 'Employee Response Submitted',
            'notes' => 'Employee submitted written explanation.',
            'files' => $explanationUrl // Link to explanation file
        ]);

        // Create second log entry for supporting documents if uploaded
        if ($supportingDocUrl) {
            HRIncidentReportLog::create([
                'incident_report_id' => $id,
                'user' => $validated['employee_name'] . ' (' . $validated['employee_email'] . ')',
                'status' => 'Employee Response Submitted',
                'notes' => 'Supporting documents attached.',
                'files' => $supportingDocUrl
            ]);
        }

        return response()->json(['message' => 'Your response has been submitted successfully.'], 200);
    }
}
