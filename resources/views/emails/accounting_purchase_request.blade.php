<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Purchase Request Form</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 13px;
            color: #000;
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
        }

        .company {
            font-weight: bold;
        }

        table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 10px;
        }

        th,
        td {
            border: 1px solid #000;
            padding: 5px;
            text-align: center;
        }

        th {
            background: #f2f2f2;
        }

        .section {
            margin-top: 15px;
        }

        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin: 5px;
            border-radius: 5px;
            color: #fff !important;
            text-decoration: none;
            font-weight: bold;
        }

        .btn-approve {
            background-color: #28a745;
        }

        .btn-decline {
            background-color: #dc3545;
        }
    </style>
</head>

<body>
    <div class="header">
        <div>
            <p class="company">PURCHASE REQUEST FORM</p>
            <p>Date: {{ $purchase['date'] ?? now()->format('F d, Y') }}</p>
            <p>Company Name: EMPIREONE BPO SOLUTIONS INC.</p>
            <p>Department/Account: {{ $purchase['department'] ?? '_________' }}</p>
        </div>
        <div>
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        </div>
        <div>
            <img src="https://eo-unified-ims.com/images/logo.png" alt="EmpireOne" height="50">
            <p>Location: {{ $purchase['location'] ?? '_________' }}</p>
            <p>Voucher Number: {{ $purchase['request_no'] ?? '_________' }}</p>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Item/Description</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Unit Cost</th>
                <th>Total Cost</th>
            </tr>
        </thead>
        <tbody>
            @foreach($purchase['items'] as $item)
            <tr>
                <td>{{ $item['description'] }}</td>
                <td>{{ $item['quantity'] }}</td>
                <td>{{ $item['unit'] }}</td>
                <td>{{ number_format($item['unit_cost'], 2) }}</td>
                <td>{{ number_format($item['total_cost'], 2) }}</td>
            </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="4" style="text-align: right; font-weight: bold;">Overall Total:</td>
                <td style="font-weight: bold;">
                    {{ number_format(collect($purchase['items'])->sum('total_cost'), 2) }}
                </td>
            </tr>
        </tfoot>
    </table>

    <div class="section flex items-center justify-between">
        <p><strong>REQUEST STATUS:</strong> {{ $purchase['status'] ?? 'N/A' }}</p>
        <p><strong>PURPOSE:</strong> {{ $purchase['purpose'] ?? 'N/A' }}</p>
        <p><strong>PRIORITY:</strong> {{ strtoupper($purchase['priority'] ?? 'N/A') }}</p>
    </div>

    <div>

        <p><strong>REQUESTED BY:</strong> {{ $purchase['requestor'] ?? 'N/A' }}</p>
    </div>

    <div class="section flex" style="margin-top:20px;">
        <div class="mr-20">
            <a href="{{ $purchase['approveUrl']}}" class="btn btn-approve">Approve</a>
        </div>

        <div class="ml-20">
            <a href="{{ $purchase['declineUrl'] }}" class="btn btn-decline">Decline</a>
        </div>
    </div>
</body>

</html>