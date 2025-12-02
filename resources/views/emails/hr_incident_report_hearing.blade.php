
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hearing Scheduled</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }

        .header {
            background-color: #f9fafb;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
        }

        .header h1 {
            color: #1e40af;
            font-size: 24px;
            margin: 10px 0;
        }

        .header p {
            color: #666;
            font-size: 16px;
            margin: 5px 0;
        }

        .content {
            background-color: #f9fafb;
            padding: 30px;
            border: 1px solid #e5e7eb;
        }

        .info-box {
            background-color: white;
            padding: 20px;
            margin: 20px 0;
            border-left: 4px solid #1e40af;
            border-radius: 4px;
        }

        .info-row {
            margin: 10px 0;
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }

        .info-row:last-child {
            border-bottom: none;
        }

        .label {
            font-weight: bold;
            color: #1f2937;
            display: inline-block;
            width: 150px;
        }

        .value {
            color: #4b5563;
        }

        .hearing-date-box {
            background-color: #dbeafe;
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
        }

        .hearing-date {
            font-size: 24px;
            font-weight: bold;
            margin: 10px 0;
        }

        .header img {
            height: 60px;
            margin-bottom: 10px;
        }

        .notes-box {
            background-color: #fef3c7;
            padding: 15px;
            margin: 20px 0;
            border-left: 4px solid #f59e0b;
            border-radius: 4px;
        }

        .footer {
            text-align: center;
            padding: 20px;
            color: #6b7280;
            font-size: 12px;
            border-top: 1px solid #e5e7eb;
            margin-top: 20px;
        }

        .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #1e40af;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
            font-weight: bold;
        }

        .warning {
            background-color: #fef2f2;
            border-left: 4px solid #ef4444;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }
    </style>
</head>

<body>
    <div class="header">
        <img src="https://eo-unified-ims.com/images/logo.png" alt="EmpireOne BPO Solutions Inc.">
        <h1 style="margin: 0;">Hearing Scheduled</h1>
        <p style="margin: 10px 0 0 0;">Incident Report Case</p>
    </div>

    <div class="content">
        <p>Dear <strong>{{ $hearingData['violator_name'] }}</strong>,</p>

        <p>This is to inform you that a hearing has been scheduled regarding your incident report case.</p>

        <div class="info-box">
            <div class="info-row">
                <span class="label">Incident Report ID:</span>
                <span class="value"><strong>{{ $hearingData['ir_id'] }}</strong></span>
            </div>
            <div class="info-row">
                <span class="label">Employee Name:</span>
                <span class="value"><strong>{{ $hearingData['violator_name'] }}</strong></span>
            </div>
            <div class="info-row">
                <span class="label">Incident Date:</span>
                <span class="value"><strong>{{ $hearingData['incident_date'] }}</strong></span>
            </div>
            <div class="info-row">
                <span class="label">Infraction:</span>
                <span class="value"><strong>{{ $hearingData['infraction'] }}</strong></span>
            </div>
        </div>

        <div class="hearing-date-box">
            <p style="margin: 0; color: #1f2937; font-weight: bold;">📅 HEARING DATE & TIME</p>
            <div class="hearing-date">{{ $hearingData['hearing_date'] }}</div>
        </div>

        @if(isset($hearingData['notes']) && $hearingData['notes'])
        <div class="notes-box">
            <h3 style="margin-top: 0; color: #000000;">📋 Hearing Details:</h3>
            <div style="margin: 0;">{!! $hearingData['notes'] !!}</div>
        </div>
        @endif

        <div class="warning">
            <h4 style="margin-top: 0; color: #991b1b;">⚠️ Important Reminders:</h4>
            <ul style="margin: 10px 0;">
                <li>Your attendance is <strong>MANDATORY</strong></li>
                <li>Please arrive 10 minutes before the scheduled time</li>
                <li>Bring any supporting documents or evidence</li>
                <li>You may bring a representative if needed</li>
                <li>Failure to attend may result in a decision by default</li>
            </ul>
        </div>

        @if(isset($hearingData['hearing_file_path']) && $hearingData['hearing_file_path'])
        <p style="background-color: #e0e7ff; padding: 10px; border-radius: 4px;">
            📎 <strong>Attachment:</strong> A document has been attached to this email. Please review it before the hearing.
        </p>
        @endif

        <p style="margin-top: 30px;">If you have any questions or concerns, please contact the Human Resources Department immediately.</p>

        <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>Human Resources Department</strong><br>
            EmpireOne Group
        </p>
    </div>

    <div class="footer">
        <p>This is an automated message from the HR Incident Report System.</p>
        <p>Please do not reply to this email.</p>
        <p>&copy; {{ date('Y') }} EmpireOne Group. All rights reserved.</p>
    </div>
</body>

</html>