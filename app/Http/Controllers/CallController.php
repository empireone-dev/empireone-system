<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client;

class CallController extends Controller
{
    public function makeCall(Request $request)
    {
        $validated = $request->validate([
            'to' => 'required|string',
        ]);

        $sid    = config('services.twilio.sid');
        $token  = config('services.twilio.token');
        $from   = config('services.twilio.from');

        $twilio = new Client($sid, $token);

        $call = $twilio->calls->create(
            $validated['to'],    // Number to call
            $from,               // Your Twilio number
            [
                "url" => route('twilio.voice') // TwiML webhook
            ]
        );

        return response()->json([
            'status' => 'calling',
            'call_sid' => $call->sid,
        ]);
    }

    // Twilio will hit this route to tell what to say/play
    public function voiceResponse()
    {
        $twiml = new \Twilio\TwiML\VoiceResponse();
        $twiml->say("Hello! This is a test call from EmpireOne Web Dev.", ['voice' => 'alice']);
        return response($twiml, 200)->header('Content-Type', 'text/xml');
    }
}
