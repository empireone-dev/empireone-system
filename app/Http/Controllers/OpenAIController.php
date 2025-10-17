<?php

namespace App\Http\Controllers;

use App\Models\HRIncidentReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Smalot\PdfParser\Parser;


class OpenAIController extends Controller
{

    public function scan_receipt(Request $request)
    {
        $file = $request->file('receipt');

        if (!$file) {
            return response()->json(['error' => 'No file uploaded'], 400);
        }

        // Convert image to base64
        $fileContent = file_get_contents($file->getRealPath());
        $mimeType = $file->getMimeType();
        $base64Image = 'data:' . $mimeType . ';base64,' . base64_encode($fileContent);

        // Prepare the OpenAI request
        $response = Http::withToken(env('OPENAI_API_KEY'))
            ->withHeaders([
                'Content-Type' => 'application/json',
            ])
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-4o', // ✅ Correct model name
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => 'Extract the date, receipt_number, description,TIN, and amount from this receipt image. Return the result strictly in JSON format with keys: date, receipt_number, description,tin, amount. No explanations, no markdown.',
                    ],
                    [
                        'role' => 'user',
                        'content' => [
                            [
                                'type' => 'image_url',
                                'image_url' => [
                                    'url' => $base64Image,
                                ],
                            ]
                        ],
                    ],
                ],
                'max_tokens' => 1000,
            ]);

        // Handle OpenAI response
        if ($response->successful()) {
            $rawOutput = trim($response['choices'][0]['message']['content']);

            // Clean up possible markdown
            $cleaned = preg_replace('/^```json|```$/m', '', trim($rawOutput));
            $data = json_decode($cleaned, true);

            return response()->json([
                'result' => $data,
            ]);
        } else {
            return response()->json([
                'error' => 'Failed to process image',
                'message' => $response->json() ?? $response->body(),
            ], $response->status());
        }
    }


    private function toStringValue($value)
    {
        if (is_null($value)) {
            return null;
        }

        // If it's an array, convert to a comma-separated list
        if (is_array($value)) {
            return implode(', ', array_map('strval', $value));
        }

        // If it's an object, convert to JSON
        if (is_object($value)) {
            return json_encode($value, JSON_UNESCAPED_UNICODE);
        }

        // Otherwise, return as string
        return (string) $value;
    }

    public function cocd_ai_content()
    {
        return 'You are an assistant that answers based only on the provided COCD PDF document. Respond in clean HTML suitable for WYSIWYG editors. Do not use markdown or code fences.';
    }

    public function incident_report_content($data)
    {
        return 'You are to create an incident report based only on the provided Incident Report document and the COCD document. Respond in clean JSON format with the following fields: violator, date, witness, details, notes, gravity_of_infraction, and article_of_infraction_details. the article_of_infraction_details is only first column of the table and make it string. Do not use markdown or code fences. Here is the data: ' . $data;
    }

    public function cocd_prompt(Request $request)
    {
        $content = '';
        $request->validate([
            'prompt' => 'required|string',
            'type' => 'nullable|string',
        ]);

        $userPrompt = $request->input('prompt');
        $type = $request->input('type');

        // Load and parse PDF
        $pdfPath = public_path('pdf/cocd.pdf');
        $pdfText = '';
        if (file_exists($pdfPath)) {
            $parser = new Parser();
            $pdf = $parser->parseFile($pdfPath);
            $pdfText = $pdf->getText();
        }

        // Choose system prompt
        if ($request->type == 'Incident Report') {
            $content = $this->incident_report_content($request->prompt);
        } else {
            $content = $this->cocd_ai_content();
        }

        // Combine prompt + reference
        $fullPrompt = $userPrompt . "\n\nReference Document:\n" . $pdfText;

        // Send to OpenAI
        $response = Http::withToken(env('OPENAI_API_KEY'))->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => $content],
                ['role' => 'user', 'content' => $fullPrompt],
            ],
            'temperature' => 0,
            'max_tokens' => 1024,
        ]);

        if (!$response->successful()) {
            return response()->json([
                'error' => $response->json('error.message', 'OpenAI request failed'),
                'status' => $response->status(),
            ], $response->status());
        }

        $rawOutput = trim($response['choices'][0]['message']['content']);

        // Try to parse JSON
        $data = json_decode($rawOutput, true);

        if ($type === 'Incident Report' && is_array($data)) {
            HRIncidentReport::create([
                'violator' => $data['violator'] ?? null,
                'date' => $data['date'] ?? null,
                'witness' => $data['witness'] ?? null,
                'details' => $data['details'] ?? null,
                'notes' => $data['notes'] ?? null,
                'violation' => $data['article_of_infraction_details'] ?? null,
                'infraction' => $this->toStringValue($data['gravity_of_infraction'] ?? null),
            ]);
            return response()->json(['result' => 'Incident report saved successfully.']);
        }

        return response()->json(['result' => $rawOutput]);
    }


    public function ticketing_prompt_stats(Request $request)
    {
        $userPrompt = $request->input('prompt');

        $aiQueryPrompt = <<<EOT
You are an AI SQL assistant. Your task is to generate valid MySQL SELECT queries based on user questions.

Use this table: `tickets`
Available columns: id, user_id, ticket_id, category_id, site_id, details, station, location, assigned_to, department, status, isUrgent, 

Joins allowed:
- Join `users` on tickets.user_id = users.id
- Join `users` as assigned on tickets.assigned_to = assigned.id
- Join `categories` on tickets.category_id = categories.id
- Join `sites` on tickets.site_id = sites.id

Only return the **raw SQL query**, no explanations or extra formatting.

User prompt: "{$userPrompt}"
EOT;

        $response = Http::withToken(env('OPENAI_API_KEY'))->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o-mini',
            'messages' => [
                ['role' => 'system', 'content' => 'You are a helpful assistant that returns only SQL queries.'],
                ['role' => 'user', 'content' => $aiQueryPrompt],
            ],
            'temperature' => 0,
        ]);

        $rawOutput = trim($response['choices'][0]['message']['content']);

        // Strip triple backticks and optional "sql"
        $generatedSQL = preg_replace('/^```sql\s*|\s*```$/', '', $rawOutput);

        // Optional: trim again to be safe
        $generatedSQL = trim($generatedSQL);
        // Now it's safe to run
        $results = DB::select($generatedSQL);


        return response()->json([
            'query' => $generatedSQL,
            'results' => $results,
        ]);
    }
}
