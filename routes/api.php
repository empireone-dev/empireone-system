<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AccountingCashFlowController;
use App\Http\Controllers\AccountingCashInBankController;
use App\Http\Controllers\AccountingDebitRecordController;
use App\Http\Controllers\AccountingExpensesController;
use App\Http\Controllers\AccountingPurchaseRequestController;
use App\Http\Controllers\AccountingPurchaseRequestItemController;
use App\Http\Controllers\CallController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EngagementActivityController;
use App\Http\Controllers\EngagementCalendarController;
use App\Http\Controllers\HRIncidentReportController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\OpenAIController;
use App\Http\Controllers\OTPController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('/call', [CallController::class, 'makeCall']);
Route::post('/twilio/voice', [CallController::class, 'voiceResponse'])->name('twilio.voice');

Route::post('/auth/login', [AccountController::class, 'login']);
Route::post('/submit_declined', [AccountingPurchaseRequestController::class, 'submit_declined']);

Route::middleware('auth:sanctum')->group(function () {

    Route::resource('tickets', TicketController::class);
    Route::get('get_tickets_by_user', [TicketController::class, 'get_tickets_by_user']);
    Route::get('export_ticket', [TicketController::class, 'export_ticket']);
    Route::get('get_tickets_by_internal', [TicketController::class, 'get_tickets_by_internal']);
    Route::post('assign_ticket', [TicketController::class, 'assign_ticket']);
    Route::post('change_ticket_status', [TicketController::class, 'change_ticket_status']);
    Route::get('get_stats', [TicketController::class, 'get_stats']);
    Route::get('send_auto_email', [TicketController::class, 'send_auto_email']);


    Route::get('get_account_tickets', [TicketController::class, 'get_account_tickets']);


    Route::resource('categories', CategoryController::class);
    Route::resource('dashboard', DashboardController::class);
    Route::resource('sites', SiteController::class);
    Route::resource('accounts', AccountController::class);
    Route::resource('notes', NoteController::class);


    Route::resource('accounting_expenses', AccountingExpensesController::class);
    Route::get('/get_daily_expenses', [AccountingExpensesController::class, 'get_daily_expenses']);
    Route::get('/my_fund_request', [AccountingExpensesController::class, 'my_fund_request']);
    Route::post('/request_change_status', [AccountingExpensesController::class, 'request_change_status']);
    Route::resource('accounting_cash_flows', AccountingCashFlowController::class);
    Route::resource('cash_in_bank', AccountingCashInBankController::class);
    Route::resource('debit_records', AccountingDebitRecordController::class);
    Route::resource('incident_report', HRIncidentReportController::class);


    Route::resource('engagement_activities', EngagementActivityController::class);
    Route::post('/update_activity', [EngagementActivityController::class, 'update_activity']);
    Route::resource('engagement_calendar', EngagementCalendarController::class);

    Route::get('/get_expenses_report', [AccountingExpensesController::class, 'get_expenses_report']);
    Route::get('/get_petty_cash', [AccountingExpensesController::class, 'get_petty_cash']);

    Route::resource('accounting_purchase_request', AccountingPurchaseRequestController::class);
    Route::post('/add_logs', [AccountingPurchaseRequestController::class, 'add_logs']);

    Route::resource('accounting_purchase_request_items', AccountingPurchaseRequestItemController::class);

    Route::post('/ticketing_prompt_stats', [OpenAIController::class, 'ticketing_prompt_stats']);
    Route::post('/cocd_prompt', [OpenAIController::class, 'cocd_prompt']);
    Route::post('/scan_receipt', [OpenAIController::class, 'scan_receipt']);


    Route::get('get_account_by_department', [AccountController::class, 'get_account_by_department']);



    Route::prefix('hr/incident-reports')->group(function () {
        Route::get('/', [HRIncidentReportController::class, 'index']);
        Route::get('/{id}', [HRIncidentReportController::class, 'show']);
        Route::post('/{id}/validate', [HRIncidentReportController::class, 'validateIR']);
        Route::post('/{id}/invalidate', [HRIncidentReportController::class, 'invalidateIR']);
        Route::post('/{id}/employee-response', [HRIncidentReportController::class, 'uploadEmployeeResponse']);
        Route::post('/{id}/schedule-hearing', [HRIncidentReportController::class, 'scheduleHearing']);
        Route::post('/{id}/upload-nod', [HRIncidentReportController::class, 'uploadNOD']);
        Route::post('/{id}/add-log', [HRIncidentReportController::class, 'addLog']);
    });
});



Route::post('/send-otp', [OTPController::class, 'send_OTP']);
Route::post('/verify-otp', [OTPController::class, 'verify_OTP']);


Route::get('/hr/incident-report/{id}/respond-data', [HRIncidentReportController::class, 'showResponseForm'])
    ->name('hr.incident-report.respond-data');

Route::post('/hr/incident-report/{id}/submit-response', [HRIncidentReportController::class, 'submitEmployeeResponse'])
    ->name('hr.incident-report.submit-response');

// Route::post('/chat', function (Request $request) {
//     $client = new \GuzzleHttp\Client();

//     $prompt = $request->prompt . "\n\n" .
//         "Please extract the following fields in JSON format:\n" .
//         "{ \"title\": \"\", \"category\": \"\", \"description\": \"\", \"station\": \"\", \"deadline\": \"YYYY-MM-DD\", \"priority\": \"Low|Medium|High\", \"status\": \"Open|In Progress|Resolved|Closed\" }";

//     $response = $client->post('https://api.openai.com/v1/chat/completions', [
//         'headers' => [
//             'Authorization' => 'Bearer ' . env('OPENAI_API_KEY'),
//             'Content-Type' => 'application/json',
//         ],
//         'json' => [
//             'model' => 'gpt-3.5-turbo',
//             'messages' => [
//                 ['role' => 'user', 'content' => $prompt],
//             ],
//         ],
//     ]);

//     $ai = json_decode($response->getBody(), true);
//     $content = $ai['choices'][0]['message']['content'];

//     // Extract JSON from the AI response
//     preg_match('/\{.*\}/s', $content, $matches);
//     $parsed = json_decode($matches[0] ?? '{}', true);

//     return response()->json([
//         'title' => $parsed['title'] ?? 'Auto-Generated Title',
//         'category' => $parsed['category'] ?? 'General',
//         'description' => $parsed['description'] ?? $content,
//         'station' => $parsed['station'] ?? 'Unassigned',
//         'deadline' => $parsed['deadline'] ?? null,
//         'priority' => $parsed['priority'] ?? 'Medium',
//         'status' => $parsed['status'] ?? 'Open',
//     ]);
// });
