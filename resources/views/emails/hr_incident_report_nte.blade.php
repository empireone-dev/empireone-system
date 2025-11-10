<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Notice to Explain (NTE)</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
        }

        .header {
            text-align: center;
            padding: 20px;
            background-color: #f8f9fa;
            border-bottom: 3px solid #dc3545;
            margin-bottom: 30px;
        }

        .header img {
            height: 60px;
            margin-bottom: 10px;
        }

        .header h1 {
            color: #dc3545;
            font-size: 24px;
            margin: 10px 0;
        }

        .header p {
            color: #666;
            font-size: 12px;
            margin: 5px 0;
        }

        .content {
            padding: 20px;
        }

        .alert-box {
            background-color: #fff3cd;
            border: 1px solid #ffc107;
            border-left: 4px solid #ffc107;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 4px;
        }

        .alert-box strong {
            color: #856404;
        }

        .section {
            margin-bottom: 25px;
        }

        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #dc3545;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 2px solid #dee2e6;
        }

        .info-table {
            width: 100%;
            margin-bottom: 15px;
        }

        .info-table td {
            padding: 8px 5px;
            vertical-align: top;
        }

        .info-table td:first-child {
            font-weight: bold;
            width: 180px;
            color: #495057;
        }

        .details-box {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            border-left: 4px solid #dc3545;
            margin-bottom: 20px;
        }

        .response-section {
            background-color: #e7f3ff;
            border: 1px solid #007bff;
            border-radius: 4px;
            padding: 20px;
            margin: 30px 0;
        }

        .response-section h3 {
            color: #007bff;
            margin-top: 0;
        }

        .deadline {
            background-color: #dc3545;
            color: white;
            padding: 10px 15px;
            border-radius: 4px;
            text-align: center;
            font-weight: bold;
            margin: 20px 0;
        }

        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #dee2e6;
            text-align: center;
            font-size: 12px;
            color: #666;
        }

        .btn {
            display: inline-block;
            padding: 12px 30px;
            margin: 10px 5px;
            border-radius: 5px;
            color: #fff !important;
            text-decoration: none;
            font-weight: bold;
            text-align: center;
        }

        .btn-primary {
            background-color: #007bff;
        }

        .btn-primary:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="https://eo-unified-ims.com/images/logo.png" alt="EmpireOne BPO Solutions Inc.">
            <h1>NOTICE TO EXPLAIN (NTE)</h1>
            <p><strong>EMPIREONE BPO SOLUTIONS INC.</strong></p>
            <p>Human Resources Department</p>
        </div>

        <div class="content">
            <div class="alert-box">
                <strong>URGENT NOTICE:</strong> This is a formal Notice to Explain regarding an incident report filed against you. Please read carefully and respond within the specified deadline.
            </div>

            <div class="section">
                <div class="section-title">Incident Report Details</div>
                <table class="info-table">
                    <tr>
                        <td>Incident Report ID:</td>
                        <td><strong>IR-{{ $irData['ir_id'] }}</strong></td>
                    </tr>
                    <tr>
                        <td>Employee Name:</td>
                        <td><strong>{{ $irData['violator'] }}</strong></td>
                    </tr>
                    <tr>
                        <td>Date of Incident:</td>
                        <td>{{ \Carbon\Carbon::parse($irData['incident_date'])->format('F d, Y') }}</td>
                    </tr>
                    <tr>
                        <td>Location/Site:</td>
                        <td>{{ $irData['location'] ?? 'N/A' }}</td>
                    </tr>
                    <tr>
                        <td>Infraction:</td>
                        <td><strong style="color: #dc3545;">{{ $irData['infraction'] }}</strong></td>
                    </tr>
                </table>
            </div>

            <div class="section">
                <div class="section-title">Incident Description</div>
                <div class="details-box">
                    {!! $irData['notes'] !!}
                </div>
            </div>

            <div class="deadline">
                ⏰ RESPONSE DEADLINE: {{ \Carbon\Carbon::parse($irData['response_deadline'])->format('F d, Y h:i A') }}
            </div>

            <div class="response-section">
                <h3>📝 How to Respond</h3>
                <p><strong>You are required to submit a written explanation regarding this incident within <span style="color: #dc3545;">{{ $irData['response_days'] }} business days</span> from receipt of this notice.</strong></p>

                <p>Your explanation should include:</p>
                <ul>
                    <li>Your version of what happened</li>
                    <li>Any evidence or documentation supporting your explanation</li>
                    <li>Names of witnesses (if any)</li>
                    <li>Any mitigating circumstances</li>
                </ul>

                <div style="text-align: center; margin-top: 20px;">
                    <a href="{{ $irData['responseUrl'] }}" class="btn btn-primary">
                        Submit Your Response Online
                    </a>
                </div>

                <p style="margin-top: 15px; font-size: 12px; color: #666;">
                    <strong>Note:</strong> Failure to respond within the deadline may be considered as a waiver of your right to explain and may result in administrative action based on available evidence.
                </p>
            </div>

            @if(isset($irData['nte_file_path']))
            <div class="section">
                <div class="section-title">Attached Document</div>
                <p>📎 A detailed Notice to Explain document has been attached to this email for your reference.</p>
            </div>
            @endif

            <div class="section">
                <div class="section-title">Contact Information</div>
                <p>If you have any questions or concerns, please contact the Human Resources Department:</p>
                <table class="info-table">
                    <tr>
                        <td>Email:</td>
                        <td>hr@empireonegroup.com</td>
                    </tr>
                    <tr>
                        <td>HR Hotline:</td>
                        <td>(032) XXX-XXXX</td>
                    </tr>
                </table>
            </div>
        </div>

        <div class="footer">
            <p><strong>EMPIREONE BPO SOLUTIONS INC.</strong></p>
            <p>This is an automated message from the Human Resources Department.</p>
            <p>Please do not reply directly to this email.</p>
            <p>&copy; {{ date('Y') }} EmpireOne BPO Solutions Inc. All rights reserved.</p>
        </div>
    </div>
</body>

</html>