<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\TicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::resource('tickets', TicketController::class);
Route::get('get_tickets_by_user', [TicketController::class, 'get_tickets_by_user']);
Route::get('get_tickets_by_internal', [TicketController::class, 'get_tickets_by_internal']);
Route::post('assign_ticket', [TicketController::class, 'assign_ticket']);
Route::post('change_ticket_status', [TicketController::class, 'change_ticket_status']);


Route::resource('categories', CategoryController::class);
Route::resource('sites', SiteController::class);
Route::resource('accounts', AccountController::class);
Route::resource('notes', NoteController::class);


Route::get('get_account_by_department', [AccountController::class, 'get_account_by_department']);


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
