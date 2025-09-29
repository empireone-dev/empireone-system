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
    console.log("purchase_requests", purchase_requests.data);

    return (
        <>
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">
                        Purchase Request
                    </h1>
                    <p className="mt-2 text-sm text-gray-700 ">
                        A list of all the purchase requests in your account,
                        including their name, description, quantity, and manager
                        approval status.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <CreateButtonSection />
                </div>
            </div>
            <div className="-mx-4 mt-8 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300  ">
                    <thead>
                        <tr>
                            <th className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                PR No.
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Department
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Requester
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Total Cost
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Priority
                            </th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Date
                            </th>

                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white ">
                        {purchase_requests?.data?.map((person, i) => {
                            const total_cost = person?.items?.reduce(
                                (sum, item) => sum + Number(item.total_cost),
                                0
                            );
                            return (
                                <tr key={i}>
                                    <td className="w-full max-w-0 py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                        <Link
                                            href={`/users/accounting/purchase_request/${person.id}`}
                                            className="text-indigo-600 underline hover:text-indigo-900 "
                                        >
                                            {person.request_no}
                                        </Link>
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500">
                                        {person?.requestor?.department}
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500">
                                        {person?.requestor?.name}
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500">
                                        {peso_value(total_cost)}
                                    </td>
                                    <td className="px-3 py-4 text-sm">
                                        {person.priority === "high" ? (
                                            <span className=" text-red-500 text-sm font-medium px-2.5 py-0.5 rounded-sm ">
                                                High
                                            </span>
                                        ) : person.priority === "medium" ? (
                                            <span className=" text-yellow-500 text-sm font-medium px-2.5 py-0.5 rounded-sm ">
                                                Medium
                                            </span>
                                        ) : person.priority === "low" ? (
                                            <span className=" text-green-500 text-sm font-medium px-2.5 py-0.5 rounded-sm ">
                                                Low
                                            </span>
                                        ) : null}
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500">
                                        {moment(person.date).format("LL")}
                                    </td>
                                    <td className="px-3 py-4 text-sm">
                                        {(() => {
                                            const statusMap = {
                                                Pending: {
                                                    label: "Pending",
                                                    classes:
                                                        "bg-yellow-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm border border-yellow-500 text-xs font-medium text-yellow-500",
                                                },
                                                "Initial Approved": {
                                                    label: "Initial Approved",
                                                    classes:
                                                        "bg-yellow-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs border border-yellow-600 font-medium  text-yellow-700",
                                                },
                                                "Second Approved": {
                                                    label: "Second Approved",
                                                    classes:
                                                        "bg-blue-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs border border-blue-500 font-medium  text-blue-500",
                                                },
                                                "Final Approved": {
                                                    label: "Final Approved",
                                                    classes:
                                                        "bg-green-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs font-medium border border-green-500 text-green-500",
                                                },
                                                Declined: {
                                                    label: "Declined",
                                                    classes:
                                                        "bg-red- inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs font-medium border border-red-500  text-red-500",
                                                },
                                                Completed: {
                                                    label: "Completed",
                                                    classes:
                                                        "bg-cyan-50 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs font-medium border border-cyan-500 text-cyan-500",
                                                },
                                            };

                                            const status =
                                                statusMap[person.status];
                                            return (
                                                <span
                                                    className={
                                                        status?.classes ??
                                                        "inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-sm text-xs font-medium border border-blue-500 text-blue-500"
                                                    }
                                                >
                                                    {person.status}
                                                </span>
                                            );
                                        })()}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="mt-4">
                    <PaginationSection />
                </div>
            </div>
        </>
    );
}
