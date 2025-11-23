<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

class HRIncidentReportHearingMail extends Mailable
{
    use Queueable, SerializesModels;

    public $hearingData;

    /**
     * Create a new message instance.
     */
    public function __construct($hearingData)
    {
        $this->hearingData = $hearingData;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $email = $this->subject('Hearing Scheduled - Incident Report #' . $this->hearingData['ir_id'])
            ->view('emails.hr_incident_report_hearing')
            ->with([
                'hearingData' => $this->hearingData
            ]);

        // Attach hearing file from S3 if exists
        if (isset($this->hearingData['hearing_file_path']) && $this->hearingData['hearing_file_path']) {
            try {
                if (Storage::disk('s3')->exists($this->hearingData['hearing_file_path'])) {
                    $fileContents = Storage::disk('s3')->get($this->hearingData['hearing_file_path']);
                    $fileName = basename($this->hearingData['hearing_file_path']);
                    
                    $email->attachData($fileContents, $fileName, [
                        'mime' => Storage::disk('s3')->mimeType($this->hearingData['hearing_file_path'])
                    ]);
                }
            } catch (\Exception $e) {
                \Log::error('Failed to attach hearing file: ' . $e->getMessage());
            }
        }

        return $email;
    }
}