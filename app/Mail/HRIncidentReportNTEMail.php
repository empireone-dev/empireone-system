<?php
// app/Mail/HRIncidentReportNTEMail.php


namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class HRIncidentReportNTEMail extends Mailable
{
    use Queueable, SerializesModels;

    public $irData;

    /**
     * Create a new message instance.
     */
    public function __construct($irData)
    {
        $this->irData = $irData;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $email = $this->subject('Notice to Explain (NTE) - Incident Report #' . $this->irData['ir_id'])
            ->view('emails.hr_incident_report_nte')
            ->with([
                'irData' => $this->irData
            ]);

        // Attach NTE file from S3 if exists
        if (isset($this->irData['nte_file_path']) && $this->irData['nte_file_path']) {
            try {
                // Check if file exists in S3
                if (Storage::disk('s3')->exists($this->irData['nte_file_path'])) {
                    $fileContents = Storage::disk('s3')->get($this->irData['nte_file_path']);
                    $fileName = basename($this->irData['nte_file_path']);
                    
                    $email->attachData($fileContents, $fileName, [
                        'mime' => Storage::disk('s3')->mimeType($this->irData['nte_file_path'])
                    ]);
                }
            } catch (\Exception $e) {
                \Log::error('Failed to attach NTE file: ' . $e->getMessage());
            }
        }

        return $email;
    }
}