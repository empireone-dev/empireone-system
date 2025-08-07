import SidebarSection from "@/app/_sections/sidebar-section";
import TopbarSection from "@/app/_sections/topbar-section";
import { get_user_thunk } from "@/app/redux/account-thunk";
import store from "@/app/store/store";
import { useEffect } from "react";
import {
    FcCalculator,
    FcClock,
    FcCollaboration,
    FcCurrencyExchange,
    FcMoneyTransfer,
    FcOnlineSupport,
    FcSupport,
    FcTemplate,
} from "react-icons/fc";
import FloatingButtonSection from "../_sections/floating-button-section";
import { useSelector } from "react-redux";

export default function Layout({ children }) {
    const { user } = useSelector((state) => state.accounts);
    useEffect(() => {
        store.dispatch(get_user_thunk());
    }, []);
    const isCurrentMain = window.location.pathname.split("/")[2];
    const isCurrentSub = window.location.pathname.split("/")[3];

    console.log("useruser", user);
    const navigation = [
        {
            name: "Dashboard",
            href: "/users/dashboard",
            icon: <FcTemplate className="h-6 w-6" />,
            current: isCurrentMain == "dashboard",
        },
        {
            name: "Ticketing",
            href: "/users/ticketing",
            icon: <FcSupport className="h-6 w-6" />,
            current: isCurrentMain == "ticketing",
            children: [
                {
                    name: "My Tickets",
                    href: "/users/ticketing/my_ticket",
                    icon: <FcOnlineSupport className="h-6 w-6" />,
                    current: isCurrentSub == "my_ticket",
                },
                {
                    name: "Internal Request",
                    href: "/users/ticketing/internal_request",
                    icon: <FcCollaboration className="h-6 w-6" />,
                    current: isCurrentSub == "internal_request",
                },
            ],
        },
        ...(user.department === "Accounting Department"
            ? [
                  {
                      name: "Accounting",
                      href: "/users/accounting",
                      icon: <FcCalculator className="h-6 w-6" />,
                      current: isCurrentMain == "accounting",
                      children: [
                          {
                              name: "My Fund Requests",
                              href: "/users/accounting/my_fund_requests",
                              icon: <FcOnlineSupport className="h-6 w-6" />,
                              current: isCurrentSub == "my_fund_requests",
                          },
                          {
                              name: "Pending Requests",
                              href: "/users/accounting/pending_request",
                              icon: <FcClock className="h-6 w-6" />,
                              current: isCurrentSub == "pending_request",
                          },
                          {
                              name: "Daily Expenses",
                              href: "/users/accounting/daily_expenses",
                              icon: <FcCurrencyExchange className="h-6 w-6" />,
                              current: isCurrentSub == "daily_expenses",
                          },
                          {
                              name: "Expense Reports",
                              href: "/users/accounting/expense_reports",
                              icon: <FcMoneyTransfer className="h-6 w-6" />,
                              current: isCurrentSub == "expense_reports",
                          },
                      ],
                  },
              ]
            : []),
        ...(user.department !== "Accounting Department"
            ? [
                  {
                      name: "Accounting",
                      href: "/users/accounting/my_fund_requests",
                      icon: <FcCalculator className="h-6 w-6" />,
                      current: isCurrentMain == "accounting",
                  },
              ]
            : []),
    ];

    const userNavigation = [
        { name: "Your profile", href: "#" },
        { name: "Sign out", href: "#" },
    ];
    return (
        <>
            <SidebarSection navigation={navigation} />
            <div className="lg:pl-72">
                <TopbarSection userNavigation={userNavigation} />

                <main className="p-3">
                    <div className="px-5">{children}</div>
                    {/* <FloatingButtonSection /> */}
                </main>
            </div>
        </>
    );
}
