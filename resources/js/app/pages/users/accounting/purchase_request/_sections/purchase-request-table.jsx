import Button from "@/app/_components/button";
import { Link } from "@inertiajs/react";
import CreateButtonSection from "./create-button-section";
import { useSelector } from "react-redux";
import { peso_value } from "@/app/lib/peso-value";
import moment from "moment";
import PaginationSection from "./pagination-section";
import Table from "@/app/_components/table";

export default function PurchaseRequestTable() {
    const { purchase_requests } = useSelector((store) => store.accounting);

    const statusMap = {
        Pending: {
            label: "Pending",
            classes:
                "bg-yellow-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm border border-yellow-500 text-xs font-medium text-yellow-500",
        },
        "Initial Approved": {
            label: "Initial Approved",
            classes:
                "bg-yellow-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs border border-yellow-600 font-medium text-yellow-700",
        },
        "Second Approved": {
            label: "Second Approved",
            classes:
                "bg-blue-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs border border-blue-500 font-medium text-blue-500",
        },
        "Final Approved": {
            label: "Final Approved",
            classes:
                "bg-green-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs font-medium border border-green-500 text-green-500",
        },
        Declined: {
            label: "Declined",
            classes:
                "bg-red-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs font-medium border border-red-500 text-red-500",
        },
        Completed: {
            label: "Completed",
            classes:
                "bg-cyan-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs font-medium border border-cyan-500 text-cyan-500",
        },
    };

    const columns = [
        { header: "PR No.", accessor: "request_no" },
        { header: "Department", accessor: "department" },
        { header: "Requestor", accessor: "requestor" },
        { header: "Date", accessor: "date" },
        { header: "Total Cost", accessor: "total_cost" },
        { header: "Priority", accessor: "priority" },
        { header: "Status", accessor: "status" },
    ];

    const tableData = purchase_requests?.data?.map((res) => {
        const total_cost = res?.items?.reduce(
            (sum, item) => sum + Number(item.total_cost),
            0
        );

        return {
            request_no: (
                <Link
                    href={`/users/accounting/purchase_request/${res.id}`}
                    className="text-indigo-600 underline hover:text-indigo-900"
                >
                    {res.request_no}
                </Link>
            ),
            department: res?.department ?? "",
            requestor: res?.requestor?.name ?? "",
            date: moment(res?.date).format("LL"),
            total_cost: peso_value(total_cost),
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
                        Purchase Request
                    </h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the purchase requests in your account,
                        including their name, description, quantity, and manager
                        approval status.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <CreateButtonSection />
                </div>
            </div>
            <div className="mt-4">
                <Table columns={columns} data={tableData} />
            </div>

            <div className="mt-4">
                <PaginationSection />
            </div>
        </>
    );
}
