<?php

namespace App\Http\Controllers;

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

        // Read the file content
        $fileContent = file_get_contents($file->getRealPath());
        // Gpt-4o-mini
        // GPT-3.5
        // Send to OpenAI API
        $response = Http::withToken(env('OPENAI_API_KEY'))->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o-mini',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Get the date,receipt_number,amount. You are an assistant that extracts text from receipts. provide the text in clean HTML format suitable for WYSIWYG editors. Do not use markdown or code fences.',
                ],
                [
                    'role' => 'user',
                    'content' => base64_encode($fileContent),
                ],
            ],
            'temperature' => 0,
            'max_tokens' => 1024,
        ]);
        // dd($response);
        if ($response->status() == 200) {

            $rawOutput = trim($response['choices'][0]['message']['content']);

            return response()->json([
                'result' => $rawOutput,
            ]);
        } else {
            return response()->json([
                'result' => trim($response),
            ]);
        }
    }

    public function cocd_prompt(Request $request)
    {
        $userPrompt = $request->input('prompt');

        // Load and parse the PDF from public path
        $pdfPath = public_path('pdf/cocd.pdf');
        $pdfText = '';

        if (file_exists($pdfPath)) {
            $parser = new Parser();
            $pdf = $parser->parseFile($pdfPath);
            $pdfText = $pdf->getText();
        }

        // Combine user prompt and PDF text
        $fullPrompt = $userPrompt . "\n\nReference Document:\n" . $pdfText;

        $response = Http::withToken(env('OPENAI_API_KEY'))->post('https://api.openai.com/v1/chat/completions', [
            'model' => 'gpt-4o-mini',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'You are an assistant that answers based only on the provided COCD PDF document. Respond in clean HTML suitable for WYSIWYG editors. Do not use markdown or code fences.',
                ],

                [
                    'role' => 'user',
                    'content' => $fullPrompt,
                ],
            ],
            'temperature' => 0,
            'max_tokens' => 1024,
        ]);

        if ($response->status() == 200) {

            $rawOutput = trim($response['choices'][0]['message']['content']);

            return response()->json([
                'result' => $rawOutput,
            ]);
        } else {
            return response()->json([
                'result' => trim($response),
            ]);
        }
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
