import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
    BuildingOfficeIcon,
    CreditCardIcon,
    UserIcon,
    UsersIcon,
} from "@heroicons/react/20/solid";
import { Link } from "@inertiajs/react";
import {
    FcBullish,
    FcButtingIn,
    FcComboChart,
    FcDataConfiguration,
} from "react-icons/fc";
import CreateTicketSection from "./create-ticket-section";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function TabsSection() {
    const slug = window.location.pathname.split("/")[4];
    const location = window.location.pathname.split("/")[3];

    const tabs = [
        {
            name: "Tickets",
            href: `/administrator/ticketing/${location}/tickets`,
            icon: FcDataConfiguration,
            current: slug == "tickets",
        },
        {
            name: "Users",
            href: `/administrator/ticketing/${location}/users`,
            icon: FcButtingIn,
            current: slug == "users",
        },
        {
            name: "Stats",
            href: `/administrator/ticketing/${location}/stats`,
            icon: FcBullish,
            current: slug == "stats",
        },
        {
            name: "Dashboard",
            href: `/administrator/ticketing/${location}/dashboard`,
            icon: FcComboChart,
            current: slug == "dashboard",
        },
    ];
    return (
        <>
            <div className="grid grid-cols-1 sm:hidden">
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    defaultValue={tabs.find((tab) => tab.current).name}
                    aria-label="Select a tab"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
                />
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav
                        aria-label="Tabs"
                        className="-mb-px items-center justify-between flex space-x-8"
                    >
                        <div className="flex gap-5">
                            {tabs.map((tab) => (
                                <Link
                                    key={tab.name}
                                    href={tab.href}
                                    aria-current={
                                        tab.current ? "page" : undefined
                                    }
                                    className={classNames(
                                        tab.current
                                            ? "border-indigo-500 text-indigo-600"
                                            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                                        "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium"
                                    )}
                                >
                                    <tab.icon
                                        aria-hidden="true"
                                        className={classNames(
                                            tab.current
                                                ? "text-indigo-500"
                                                : "text-gray-400 group-hover:text-gray-500",
                                            "mr-2 -ml-0.5 size-5"
                                        )}
                                    />
                                    <span>{tab.name}</span>
                                </Link>
                            ))}
                        </div>
                        <div>
                            <CreateTicketSection />
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
