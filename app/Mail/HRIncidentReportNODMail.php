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

class HRIncidentReportNODMail extends Mailable
{
    use Queueable, SerializesModels;

    public $nodData;

    /**
     * Create a new message instance.
     */
    public function __construct($nodData)
    {
        $this->nodData = $nodData;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        $email = $this->subject('Notice of Decision (NOD) - Incident Report #' . $this->nodData['ir_id'])
            ->view('emails.hr_incident_report_nod')
            ->with([
                'nodData' => $this->nodData
            ]);

        // Attach NOD file from S3 if exists
        if (isset($this->nodData['nod_file_path']) && $this->nodData['nod_file_path']) {
            try {
                if (Storage::disk('s3')->exists($this->nodData['nod_file_path'])) {
                    $fileContents = Storage::disk('s3')->get($this->nodData['nod_file_path']);
                    $fileName = basename($this->nodData['nod_file_path']);
                    
                    $email->attachData($fileContents, $fileName, [
                        'mime' => Storage::disk('s3')->mimeType($this->nodData['nod_file_path'])
                    ]);
                }
            } catch (\Exception $e) {
                \Log::error('Failed to attach NOD file: ' . $e->getMessage());
            }
        }

        return $email;
    }
}