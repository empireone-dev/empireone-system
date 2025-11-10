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

        // Attach NTE file if exists
        if (isset($this->irData['nte_file_path']) && file_exists(storage_path('app/' . $this->irData['nte_file_path']))) {
            $email->attach(storage_path('app/' . $this->irData['nte_file_path']), [
                'as' => 'NTE_' . $this->irData['ir_id'] . '.pdf',
                'mime' => 'application/pdf',
            ]);
        }

        return $email;
    }
}