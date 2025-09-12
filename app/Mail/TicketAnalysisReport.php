<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TicketAnalysisReport extends Mailable
{
    use Queueable, SerializesModels;

    public $report;

    /**
     * Create a new message instance.
     */
    public function __construct($report)
    {
        $this->report = $report;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject('IT Ticket Analysis Report')
            ->html($this->report); 
    }
}
