import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { Link, router } from "@inertiajs/react";
import {
    FcBarChart,
    FcBusinesswoman,
    FcCalendar,
    FcOvertime,
    FcRules,
} from "react-icons/fc";
import { useSelector } from "react-redux";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function PurchaseRequestTabsSection() {
    const { user } = useSelector((state) => state.accounts);
    const isCurrentSub = window.location.pathname.split("/")[4];
    const tabs = [
        {
            name: "My Purchase Requests",
            href: "/users/accounting/purchase_request/create_purchase_request",
            icon: FcBusinesswoman,
            current: isCurrentSub == "create_purchase_request",
        },
        ...(user.department === "Accounting Department"
            ? [
                  {
                      name: "Pending Request",
                      href: "/users/accounting/purchase_request/pending_purchase_request",
                      icon: FcOvertime,
                      current: isCurrentSub == "pending_purchase_request",
                  },
              ]
            : []),

        ...(user.department === "Accounting Department"
            ? [
                  {
                      name: "Purchase Order",
                      href: "/users/accounting/purchase_request/purchase_order",
                      icon: FcRules,
                      current: isCurrentSub == "purchase_order",
                  },
              ]
            : []),
    ];

    return (
        <div>
            <div className="grid grid-cols-1 sm:hidden">
                <select
                    value={`/users/accounting/purchase_request/${isCurrentSub}`}
                    onChange={(e) => router.visit(e.target.value)}
                    aria-label="Select a tab"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-gray-100 dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500"
                >
                    {tabs.map((tab, i) => (
                        <option value={tab.href} key={i}>
                            {tab.name}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500 dark:fill-gray-400"
                />
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200 dark:border-white/10">
                    <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                        {tabs.map((tab, i) => (
                            <Link
                                key={i}
                                href={tab.href}
                                aria-current={tab.current ? "page" : undefined}
                                className={classNames(
                                    tab.current
                                        ? "border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-white/20 dark:hover:text-gray-300",
                                    "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium"
                                )}
                            >
                                <tab.icon
                                    aria-hidden="true"
                                    className={classNames(
                                        tab.current
                                            ? "text-indigo-500 dark:text-indigo-400"
                                            : "text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-400",
                                        "mr-2 -ml-0.5 size-5"
                                    )}
                                />
                                <span>{tab.name}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
