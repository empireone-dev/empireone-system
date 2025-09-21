<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AccountingPurchaseRequestMail extends Mailable
{
    use Queueable, SerializesModels;

    use Queueable, SerializesModels;

    public $purchase;

    /**
     * Create a new message instance.
     */
    public function __construct($purchase)
    {
        $this->purchase = $purchase;
    }

    /**
     * Build the message.
     */
    public function build()
    {
        return $this->subject($this->purchase['request_no'].' New Purchase Request Submitted:')
            ->view('emails.accounting_purchase_request')
            ->with([
                'purchase' => $this->purchase
            ]);
    }
}
