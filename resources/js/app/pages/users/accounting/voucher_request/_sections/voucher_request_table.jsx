import { Link } from "@inertiajs/react";
import { useSelector } from "react-redux";
import { peso_value } from "@/app/lib/peso-value";
import moment from "moment";

import Table from "@/app/_components/table";
import PaginationSection from "./pagination-section";
import CreateButtonSection from "./create-button-section";

export default function VoucherRequestTable() {
    const { voucher_requests } = useSelector((store) => store.accounting);

    const sampleData = [
        {
            id: 1,
            voucher_no: "VR-001",
            department: "IT",
            requestor: "John Doe",
            date: "2024-01-15",
            purpose: "Software Subscription",
            amount: 15000,
            priority: "high",
            status: "Pending",
        },
        {
            id: 2,
            voucher_no: "VR-002",
            department: "Finance",
            requestor: "Jane Smith",
            date: "2024-01-20",
            purpose: "Printing Services",
            amount: 25000,
            priority: "high",
            status: "Approved",
        },
        {
            id: 3,
            voucher_no: "VR-003",
            department: "HR",
            requestor: "Mike Johnson",
            date: "2024-01-25",
            purpose: "Flight Reimbursement",
            amount: 8500,
            priority: "medium",
            status: "Released",
        },
        {
            id: 4,
            voucher_no: "VR-004",
            department: "Accounting",
            requestor: "Sarah Wilson",
            date: "2024-01-30",
            purpose: "Office Supplies",
            amount: 12000,
            priority: "low",
            status: "Declined",
        },
    ];

    const statusMap = {
        Pending: {
            label: "Pending",
            classes:
                "bg-yellow-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm border border-yellow-500 text-xs font-medium text-yellow-500",
        },
        Approved: {
            label: "Approved",
            classes:
                "bg-green-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs border border-green-500 font-medium text-green-600",
        },
        Declined: {
            label: "Declined",
            classes:
                "bg-red-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm border border-red-500 text-xs font-medium text-red-500",
        },
        Released: {
            label: "Released",
            classes:
                "bg-blue-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs font-medium border border-blue-500 text-blue-600",
        },
    };

    const columns = [
        { header: "VR No.", accessor: "voucher_no" },
        { header: "Department", accessor: "department" },
        { header: "Requestor", accessor: "requestor" },
        { header: "Date", accessor: "date" },
        { header: "Purpose", accessor: "purpose" },
        { header: "Amount", accessor: "amount" },
        { header: "Priority", accessor: "priority" },
        { header: "Status", accessor: "status" },
    ];

    // Use sample data if voucher_requests is empty or undefined
    const dataSource =
        voucher_requests?.data?.length > 0 ? voucher_requests.data : sampleData;

    const tableData = dataSource?.map((res) => {
        return {
            voucher_no: (
                <Link
                    href={`/users/accounting/voucher_request/${res.id}`}
                    className="text-indigo-600 underline hover:text-indigo-900"
                >
                    {res.voucher_no}
                </Link>
            ),
            department: res?.department ?? "",
            requestor: res.requestor,
            date: moment(res?.date).format("LL"),
            purpose: res?.purpose ?? "",
            amount: peso_value(res?.amount ?? 0),
            priority:
                res.priority === "high" ? (
                    <span className="bg-red-200 text-red-500 text-sm font-medium px-2.5 py-0.5 rounded-sm">
                        High
                    </span>
                ) : res.priority === "medium" ? (
                    <span className="bg-yellow-100 text-yellow-600 text-sm font-medium px-2.5 py-0.5 rounded-sm">
                        Medium
                    </span>
                ) : res.priority === "low" ? (
                    <span className="bg-green-200 text-green-500 text-sm font-medium px-2.5 py-0.5 rounded-sm">
                        Low
                    </span>
                ) : null,
            status: (
                <span
                    className={
                        statusMap[res?.status]?.classes ??
                        "inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs font-medium border border-gray-400 text-gray-600"
                    }
                >
                    {statusMap[res?.status]?.label ?? res?.status}
                </span>
            ),
        };
    });

    return (
        <>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">
                        Voucher Request
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the voucher requests in your account,
                        including payee, amount, date, and approval status.
                    </p>
                </div>
                <div>
                    <CreateButtonSection />
                </div>
            </div>

            <div className="mt-4">
                <Table columns={columns} data={tableData} />
            </div>

            <div className="mt-4 flex flex-col items-center">
                <PaginationSection />
            </div>
        </>
    );
}
