<?php

namespace App\Http\Controllers;

use App\Mail\AccountingPurchaseRequestMail;
use App\Models\AccountingPurchaseRequest;
use App\Models\AccountingPurchaseRequestItem;
use App\Models\AccountingPurchaseRequestLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;


class AccountingPurchaseRequestController extends Controller
{


    public function email($number, $site)
    {
        return env("STAGE_{$number}_{$site}");
    }

    public function add_logs(Request $request)
    {
        if ($request->hasFile('file')) {
            $path = $request->file('file')->store(date("Y"), 's3');
            $url = Storage::disk('s3')->url($path);
        }
        AccountingPurchaseRequestLog::create([
            'accounting_purchase_requests_id' => $request->accounting_purchase_requests_id,
            'status' => $request->status,
            'notes' => $request->notes,
            'files' => $url ?? null,
        ]);
        AccountingPurchaseRequest::where('id', $request->accounting_purchase_requests_id)->update([
            'status' => $request->status,
        ]);
        return response()->json('success', 200);
    }
    public function approve(Request $request, $request_no)
    {
        if (!$request->hasValidSignature()) {
            return response()->json(['message' => 'Invalid or expired link'], 403);
        }

        $pr = AccountingPurchaseRequest::where('request_no', $request_no)
            ->with('requestor', 'items')
            ->first();

        if (!$pr) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        if ($pr->status === 'Declined') {
            return Inertia::render('accounting_approval/declined', [
                'message' => 'Purchase request was already declined.'
            ]);
        }

        // Prevent re-approvals
        $hasExist = AccountingPurchaseRequestLog::where('accounting_purchase_requests_id', $pr->id)
            ->where('status', $request->status)
            ->orderBy('id', 'desc')
            ->first();

        if ($hasExist) {
            return Inertia::render('accounting_approval/approved', [
                'message' => "Purchase request already {$hasExist->status}."
            ]);
        }

        // Define approval flow
        $statusFlow = [
            'Pending'          => ['next' => 'Initial Approved', 'email_level' => 2],
            'Initial Approved' => ['next' => 'Second Approved', 'email_level' => 3],
            'Second Approved'  => ['next' => 'Final Approved',  'email_level' => 4],
            'Final Approved'  => ['next' => 'Budget Released',  'email_level' => 5],
        ];

        // Already fully approved
        if ($pr->status === 'Final Approved') {
            return Inertia::render('accounting_approval/approved', [
                'message' => "Purchase Request already Final Approved."
            ]);
        }

        // If current status is not part of the flow
        if (!isset($statusFlow[$pr->status])) {
            return response()->json(['message' => 'Invalid request status'], 400);
        }

        // Get next status and approver email
        $newStatus = $statusFlow[$pr->status]['next'];
        $newPath = '';
        if ($newStatus == "Initial Approved") {
            $newPath = 'Second Approved';
        }
        if ($newStatus == "Second Approved") {
            $newPath = 'Final Approved';
        }
        if ($newStatus == "Final Approved") {
            $newPath = 'Budget Released';
        }
        $site = $pr->requestor['location'] == 'San Carlos' ? 'SCC' : 'CARCAR';
        $send_to  = $this->email($statusFlow[$pr->status]['email_level'], $site);

        // Update status
        $pr->update(['status' => $newStatus]);

        // Generate signed URLs
        $approveUrl = URL::signedRoute('purchase.approve', [
            'request_no' => $request_no,
            'status'     =>  $newPath
        ]);
        $declineUrl = URL::signedRoute('purchase.decline', [
            'request_no' => $request_no,
            'status' =>  $newPath
        ]);
        // Mail data
        $mailData = [
            'items'      => $pr->items,
            'purpose'    => $pr->purpose,
            'priority'   => $pr->priority,
            'request_no' => $pr->request_no,
            'requestor'  => $pr->requestor->name,
            'location'   => $pr->requestor->location,
            'position'   => $pr->requestor->position,
            'approveUrl' => $approveUrl,
            'declineUrl' => $declineUrl,
            'status'     => $newStatus,
        ];

        // Log + notify
        AccountingPurchaseRequestLog::create([
            'accounting_purchase_requests_id' => $pr->id,
            'status' => $newStatus
        ]);

        if ($send_to && $newStatus != 'Final Approved') {
            Mail::to($send_to)->send(new AccountingPurchaseRequestMail($mailData));
        }

        return Inertia::render('accounting_approval/approved', [
            'message' => "Purchase Request {$newStatus} successfully."
        ]);
    }




    public function decline(Request $request, $request_no)
    {
        if (!$request->hasValidSignature()) {
            return response()->json(['message' => 'Invalid or expired link'], 403);
        }
        $pr = AccountingPurchaseRequest::where('request_no', $request_no)->first();
        if (!$pr) {
            return response()->json(['message' => 'Record not found'], 404);
        } else if ($pr->status === 'Declined') {
            return Inertia::render('accounting_approval/declined', [
                'message' => "Purchase request already {$pr->status}."
            ]);
        }


        $hasExist = AccountingPurchaseRequestLog::where('accounting_purchase_requests_id', $pr->id)
            ->where('status', $request->status)
            ->orderBy('id', 'desc')
            ->first();

        if ($hasExist) {
            return Inertia::render('accounting_approval/approved', [
                'message' => "Purchase request already {$hasExist->status}."
            ]);
        }

        return Inertia::render('accounting_approval/declined_form', ['message' => "Purchase request {$pr->status} declined form"]);
    }

    public function submit_declined(Request $request)
    {
        $validated = $request->validate([
            'purchaseId' => 'required|string',
            'reason' => 'required|string',
        ]);

        $pr = AccountingPurchaseRequest::where('request_no', $validated['purchaseId'])->first();
        if (!$pr) {
            return response()->json(['message' => 'Record not found'], 404);
        }
        $pr->update(['status' => 'Declined']);
        // Log + notify
        AccountingPurchaseRequestLog::create([
            'accounting_purchase_requests_id' => $pr->id,
            'status' => 'Declined',
            'notes' => $validated['reason']
        ]);
        return response()->json(['message' => 'Purchase request declined successfully.'], 200);
    }
    public function show($id)
    {
        $pr = AccountingPurchaseRequest::where('id', $id)->with(['items', 'requestor', 'logs'])->first();
        return response()->json($pr, 200);
    }
    public function store(Request $request)
    {
        $items = json_decode($request->items, true);
        $auth = Auth::user();
        $ap = AccountingPurchaseRequest::create([
            ...$request->all(),
            'requestor_id' => $auth->id,
            'status' => 'Pending'
        ]);
        foreach ($items as $key => $value) {
            AccountingPurchaseRequestItem::create([
                "accounting_purchase_requests_id" => $ap->id,
                "description" => $value['description'],
                "quantity" => $value['quantity'],
                "stock_no" => $value['stock_no'],
                "total_cost" => $value['total_cost'],
                "unit" => $value['unit'],
                "unit_cost" => $value['unit_cost'],
            ]);
        }
        $approveUrl = URL::signedRoute('purchase.approve', [
            'request_no' => $ap['request_no'],
            'status' => 'Initial Approved'  // include as query parameter here
        ]);
        AccountingPurchaseRequestLog::create([
            'accounting_purchase_requests_id' => $ap->id,
            'status' => 'Pending'
        ]);
        $declineUrl = URL::signedRoute('purchase.decline', [
            'request_no' => $ap['request_no'],
            'status' => 'Initial Approved',
        ]);

        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store(date("Y"), 's3');
                $url = Storage::disk('s3')->url($path);
                AccountingPurchaseRequestLog::create([
                    'accounting_purchase_requests_id' => $ap->id,
                    'files' => $url,
                    'status' => 'File(s) Uploaded'
                ]);
            }
        }



        $site = $auth->location == 'San Carlos' ? 'SCC' : 'CARCAR';
        Mail::to($this->email(1, $site))->send(new AccountingPurchaseRequestMail([
            ...$request->all(),
            'items' => $items,
            'requestor' => $auth->name,
            'location' => $auth->location,
            'position' => $auth->position,
            'approveUrl' => $approveUrl,
            'declineUrl' => $declineUrl,
            'status' => 'Pending',
        ]));
        return response()->json(['message' => 'Created successfully'], 200);
    }
    public function index()
    {
        $auth = Auth::user();
        $purchase_request = AccountingPurchaseRequest::where('requestor_id', $auth->id)->with(['requestor', 'items'])->orderBy('id', 'desc')->paginate(10); // Get the first record from the model
        return response()->json($purchase_request, 200); // Return it as a JSON response with 200 OK
    }


    // public function update(Request $request, $id)
    // {
    //     $cflow = AccountingPurchaseRequest::find($id);
    //     if (!$cflow) {
    //         return response()->json(['message' => 'Record not found'], 404);
    //     }

    //     $validatedData = $request->validate([
    //         'starting_balance' => 'required',
    //         'cash_withdrawn' => 'required',
    //         'total' => 'required',
    //     ]);

    //     $cflow->update($validatedData);

    //     return response()->json($cflow, 200);
    // }
}
