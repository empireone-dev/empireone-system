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


class AccountingPurchaseRequestController extends Controller
{
    public function email($number)
    {

        if ($number == 1) {
            return "webdev@empireonegroup.com";
        } else if ($number == 2) {
            return "webdev@empireonegroup.com";
        } else if ($number == 3) {
            return "webdev@empireonegroup.com";
        }
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
            ->orderByDesc('id')
            ->first();

        if ($hasExist) {
            return Inertia::render('accounting_approval/approved', [
                'message' => "Purchase request already {$hasExist->status}."
            ]);
        }

        // Define approval flow
        $statusFlow = [
            'Pending'          => ['next' => 'Initial Approved', 'email_level' => 2],
            'Initial Approved' => ['next' => 'Second Approved', 'email_level' => 2],
            'Second Approved'  => ['next' => 'Final Approved',  'email_level' => 3],
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
        $send_to  = $this->email($statusFlow[$pr->status]['email_level']);

        // Update status
        $pr->update(['status' => $newStatus]);

        // Generate signed URLs
        $approveUrl = URL::signedRoute('purchase.approve', [
            'request_no' => $request_no,
            'status'     =>  $newPath
        ]);
        $declineUrl = URL::signedRoute('purchase.decline', ['request_no' => $request_no]);

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
        }
        if ($pr->status == 'Initial Approved' || $pr->status == 'Second Approved' || $pr->status == 'Final Approved') {
            return Inertia::render('accounting_approval/approved', ['message' => 'Purchase request approved successfully.']);
        } else if ($pr->status == 'Declined') {
            return Inertia::render('accounting_approval/declined', ['message' => 'Purchase request declined successfully.']);
        } else if ($pr->status == 'Pending') {
            return Inertia::render('accounting_approval/declined_form', ['message' => 'Purchase request declined form']);
        }
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
            'status' => 'Declined'
        ]);
        return response()->json(['message' => 'Purchase request declined successfully.'], 200);
    }
    public function show($id)
    {
        $pr = AccountingPurchaseRequest::where('id', $id)->with(['items', 'requestor'])->first();
        return response()->json($pr, 200);
    }
    public function store(Request $request)
    {
        $auth = Auth::user();
        $ap = AccountingPurchaseRequest::create([
            ...$request->all(),
            'requestor_id' => $auth->id,
            'status' => 'Pending'
        ]);
        foreach ($request->items as $key => $value) {
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
        $approveUrl = URL::signedRoute(
            'purchase.approve',
            [
                'request_no' => $ap['request_no'],
                'status' => 'Initial Approved'  // include as query parameter here
            ]
        );
        AccountingPurchaseRequestLog::create([
            'accounting_purchase_requests_id' => $ap->id,
            'status' => 'Pending'
        ]);
        $declineUrl = URL::signedRoute('purchase.decline', ['request_no' => $ap['request_no']]);


        Mail::to($this->email(1))->send(new AccountingPurchaseRequestMail([
            ...$request->all(),
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
        $purchase_request = AccountingPurchaseRequest::where('requestor_id', $auth->id)->with(['requestor', 'items'])->paginate(); // Get the first record from the model
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
