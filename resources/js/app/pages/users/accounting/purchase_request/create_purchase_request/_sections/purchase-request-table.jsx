import Button from "@/app/_components/button";
import { Link } from "@inertiajs/react";
import CreateButtonSection from "./create-button-section";
import { useSelector } from "react-redux";
import { peso_value } from "@/app/lib/peso-value";
import moment from "moment";

const people = [
    {
        request_no: "PR#-091725-01",
        department: "IT",
        requester: "Wacky Hojilla",
        total_cost: "$1,200",
        priority: "High",
        date: "2025-09-17",
        status: "Pending",
    },
    {
        request_no: "PR#-091725-02",
        department: "IT",
        requester: "Mark Harvey Leduna",
        total_cost: "$1,200",
        priority: "Low",
        date: "2025-09-17",
        status: "Approved",
    },
    {
        request_no: "PR#-091725-03",
        department: "IT",
        requester: "Marlou Pepito",
        total_cost: "$1,200",
        priority: "Medium",
        date: "2025-09-17",
        status: "Purchased",
    },
    {
        request_no: "PR#-091725-04",
        department: "IT",
        requester: "Quicky ",
        total_cost: "$1,200",
        priority: "High",
        date: "2025-09-17",
        status: "Completed",
    },
];

export default function PurchaseRequestTable() {
    const { purchase_requests } = useSelector((store) => store.accounting);
    console.log("purchase_requests", purchase_requests.data);

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold text-gray-900">
                        Request
                    </h1>
                    <p className="mt-2 text-sm text-gray-700 ">
                        A list of all the purchase requests in your account
                        including their name, description, quantity and
                        is_manager_approved.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <CreateButtonSection />
                </div>
            </div>
            <div className="-mx-4 mt-8 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300 ">
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
                            <th className="py-3.5 pr-4 pl-3 sm:pr-0">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white ">
                        {purchase_requests?.data?.map((person, i) => {
                            const total_cost = person?.items?.reduce((sum, item) => sum + Number(item.total_cost), 0);
                            return (
                                <tr key={i}>
                                    <td className="w-full max-w-0 py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                        {person.request_no}
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
                                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-sm border border-red-400">
                                                High
                                            </span>
                                        ) : person.priority === "medium" ? (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-sm border border-yellow-300">
                                                Medium
                                            </span>
                                        ) : person.priority === "low" ? (
                                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-sm border border-green-400">
                                                Low
                                            </span>
                                        ) : null}
                                    </td>
                                    <td className="px-3 py-4 text-sm text-gray-500">
                                        {moment(person.date).format('LL')}
                                    </td>
                                    <td className="px-3 py-4 text-sm">
                                        {person.status === "Pending" ? (
                                            <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-lg border border-yellow-300">
                                                Pending
                                            </span>
                                        ) : person.status === "Approved" ? (
                                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-lg border border-blue-300">
                                                Approved
                                            </span>
                                        ) : person.status === "Purchased" ? (
                                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-lg border border-purple-300">
                                                Purchased
                                            </span>
                                        ) : person.status === "Completed" ? (
                                            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-lg border border-green-300">
                                                Completed
                                            </span>
                                        ) : null}
                                    </td>

                                    <td className="py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-0">
                                        <Link
                                            href={`/users/accounting/purchase_request/${person.id}`}
                                            className="text-indigo-600 hover:text-indigo-900 "
                                        >
                                            Show Details
                                            <span className="sr-only">
                                                , {person.request_no}
                                            </span>
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
