<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notice of Decision (NOD)</title>
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
            color: #dc2626;
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

        .decision-box {
            background-color: #fee2e2;
            padding: 20px;
            margin: 20px 0;
            border-radius: 8px;
            text-align: center;
            border: 2px solid #dc2626;
        }

        .decision-box h2 {
            color: #991b1b;
            margin-top: 0;
            font-size: 18px;
        }

        .sanction {
            background-color: #dc2626;
            color: white;
            padding: 15px;
            border-radius: 4px;
            font-size: 24px;
            font-weight: bold;
            margin: 15px 0;
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

        .alert-box {
            background-color: #fef2f2;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
        }

        .appeal-section {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 15px;
            margin: 20px 0;
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
    </style>
</head>

<body>
    <div class="header">
        <img src="https://eo-unified-ims.com/images/logo.png" alt="EmpireOne BPO Solutions Inc.">
        <h1 style="margin: 0;">Notice of Decision (NOD)</h1>
        <p style="margin: 10px 0 0 0;">Incident Report Case - Final Decision</p>
    </div>

    <div class="content">
        <p>Dear <strong>{{ $nodData['violator_name'] }}</strong>,</p>

        <div class="alert-box">
            <strong style="color: #991b1b;">FINAL DECISION:</strong> This Notice of Decision serves as the official notification of the final administrative decision regarding your incident report case.
        </div>

        <div class="info-box">
            <div class="info-row">
                <span class="label">Incident Report ID:</span>
                <span class="value">{{ $nodData['ir_id'] }}</span>
            </div>
            <div class="info-row">
                <span class="label">Employee Name:</span>
                <span class="value">{{ $nodData['violator_name'] }}</span>
            </div>
            <div class="info-row">
                <span class="label">Incident Date:</span>
                <span class="value">{{ \Carbon\Carbon::parse($nodData['incident_date'])->format('F d, Y') }}</span>
            </div>
            <div class="info-row">
                <span class="label">Infraction:</span>
                <span class="value">{{ $nodData['infraction'] }}</span>
            </div>
            <div class="info-row">
                <span class="label">Case Status:</span>
                <span class="value" style="color: #dc2626; font-weight: bold;">CLOSED</span>
            </div>
        </div>

        <div class="decision-box">
            <h2>📋 ADMINISTRATIVE SANCTION</h2>
            <div class="sanction">{{ $nodData['sanction'] }}</div>
            <p style="margin: 10px 0; color: #991b1b; font-size: 14px;">
                This decision has been made after careful review of the incident, your explanation, and applicable company policies.
            </p>
        </div>

        @if(isset($nodData['notes']) && $nodData['notes'])
        <div class="notes-box">
            <h3 style="margin-top: 0; color: #000000;">📋 Additional Notes:</h3>
            <p style="margin: 0; white-space: pre-wrap;">{{ $nodData['notes'] }}</p>
        </div>
        @endif

        <div class="appeal-section">
            <h4 style="margin-top: 0; color: #92400e;">⚠️ RIGHT TO APPEAL</h4>
            <p><strong>You have the right to appeal this decision within THREE (3) calendar days</strong> from receipt of this Notice of Decision.</p>
            <p>To file an appeal, you must:</p>
            <ul style="margin: 10px 0;">
                <li>Submit a written appeal to Management</li>
                <li>Present <strong>new and controverting evidence</strong> to support your case</li>
                <li>File within the THREE (3) calendar day deadline</li>
            </ul>
            <p style="margin-top: 15px; font-size: 12px; color: #92400e;">
                <strong>Note:</strong> Failure to appeal within the specified period will render this decision final and executory.
            </p>
        </div>

        @if(isset($nodData['nod_file_path']) && $nodData['nod_file_path'])
        <p style="background-color: #e0e7ff; padding: 10px; border-radius: 4px;">
            📎 <strong>Attachment:</strong> The complete Notice of Decision document has been attached to this email for your official records.
        </p>
        @endif

        <div style="background-color: white; padding: 15px; border-left: 4px solid #dc2626; border-radius: 4px; margin: 20px 0;">
            <h4 style="margin-top: 0; color: #991b1b;">Important Reminders:</h4>
            <ul style="margin: 10px 0;">
                <li>This decision is effective immediately unless appealed</li>
                <li>Any repetition of the same or similar violation may result in more severe disciplinary action, up to and including termination</li>
                <li>Keep a copy of this notice for your records</li>
                <li>Contact HR if you have questions about this decision</li>
            </ul>
        </div>

        <p style="margin-top: 30px;">If you have any questions or wish to discuss this decision, please contact the Human Resources Department.</p>

        <p style="margin-top: 30px;">
            Sincerely,<br>
            <strong>Human Resources Department</strong><br>
            EmpireOne BPO Solutions Inc.
        </p>
    </div>

    <div class="footer">
        <p>This is an automated message from the HR Incident Report System.</p>
        <p>Please do not reply to this email.</p>
        <p>&copy; {{ date('Y') }} EmpireOne BPO Solutions Inc. All rights reserved.</p>
    </div>
</body>

</html>