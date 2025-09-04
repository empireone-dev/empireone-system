import { Link } from "@inertiajs/react";

const people = [
    {
        name: "Lindsay Walton",
        description: "Front-end Developer",
        quantity: "10",
        is_manager_approved: "Member",
        is_admin_approved: "Member",
        status: "Active",
    },
    {
        name: "Courtney Henry",
        description: "Designer",
        quantity: "20",
        is_manager_approved: "Admin",
        is_admin_approved: "Member",
        status: "Active",
    },
    {
        name: "Tom Cook",
        description: "Director of Product",
        quantity: "5",
        is_manager_approved: "Member",
        is_admin_approved: "Member",
        status: "Active",
    },
    {
        name: "Whitney Francis",
        description: "Copywriter",
        quantity: "30",
        is_manager_approved: "Admin",
        is_admin_approved: "Member",
        status: "Active",
    },
    {
        name: "Leonard Krasner",
        description: "Senior Designer",
        quantity: "8",
        is_manager_approved: "Owner",
        is_admin_approved: "Member",
        status: "Active",
    },
    {
        name: "Floyd Miles",
        description: "Principal Designer",
        quantity: "9",
        is_manager_approved: "Member",
        is_admin_approved: "Member",
        status: "Active",
    },
];

export default function PurchaseRequestTable() {
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
                    <button
                        type="button"
                        className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Create Purchase Request
                    </button>
                </div>
            </div>
            <div className="-mx-4 mt-8 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-white/15">
                    <thead>
                        <tr>
                            <th
                                scope="col"
                                className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                            >
                                Name of Requestor
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                            >
                                Description
                            </th>
                            <th
                                scope="col"
                                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                            >
                                Quantity
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Is Manager Approved?
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Is Admin Approved?
                            </th>
                            <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                            >
                                Status
                            </th>
                            <th
                                scope="col"
                                className="py-3.5 pr-4 pl-3 sm:pr-0"
                            >
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-white/10 dark:bg-gray-900">
                        {people.map((person, i) => (
                            <tr key={i}>
                                <td className="w-full max-w-0 py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                                    {person.name}
                                    <dl className="font-normal lg:hidden">
                                        <dt className="sr-only">Description</dt>
                                        <dd className="mt-1 truncate text-gray-700 dark:text-gray-300">
                                            {person.description}
                                        </dd>
                                        <dt className="sr-only sm:hidden">
                                            Quantity
                                        </dt>
                                        <dd className="mt-1 truncate text-gray-500 sm:hidden dark:text-gray-400">
                                            {person.quantity}
                                        </dd>
                                    </dl>
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell dark:text-gray-400">
                                    {person.description}
                                </td>
                                <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell dark:text-gray-400">
                                    {person.quantity}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                    {person.is_manager_approved}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                    {person.is_admin_approved}
                                </td>
                                <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                                    {person.status}
                                </td>
                                <td className="py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-0">
                                    <Link
                                        href={`/users/accounting/purchase_request/${i}`}
                                        className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        Show Details
                                        <span className="sr-only">
                                            , {person.name}
                                        </span>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
