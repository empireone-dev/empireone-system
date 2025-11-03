import SidebarSection from "@/app/_sections/sidebar-section";
import TopbarSection from "@/app/_sections/topbar-section";
import { get_user_thunk } from "@/app/redux/account-thunk";
import store from "@/app/store/store";
import { useEffect } from "react";
import {
    FcAdvertising,
    FcBarChart,
    FcCalculator,
    FcCalendar,
    FcClock,
    FcCollaboration,
    FcConferenceCall,
    FcCurrencyExchange,
    FcDownload,
    FcEngineering,
    FcFrame,
    FcHighPriority,
    FcIdea,
    FcMoneyTransfer,
    FcMultipleSmartphones,
    FcNeutralTrading,
    FcNews,
    FcOnlineSupport,
    FcPortraitMode,
    FcSalesPerformance,
    FcSelfServiceKiosk,
    FcServices,
    FcSupport,
    FcSurvey,
    FcTemplate,
    FcTwoSmartphones,
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
        {
            name: "Accounting",
            href: "/users/accounting",
            icon: <FcCalculator className="h-6 w-6" />,
            current: isCurrentMain == "accounting",
            children: [
                ...(user.department === "Accounting Department"
                    ? [
                          {
                              name: "Expenses Report",
                              href: "/users/accounting/expenses/daily_expenses?payment_method=Cash",
                              icon: <FcBarChart className="h-6 w-6" />,
                              current: isCurrentSub == "expenses",
                          },
                      ]
                    : []),
                {
                    name: "Purchase Request",
                    href: "/users/accounting/purchase_request",
                    icon: <FcSurvey className="h-6 w-6" />,
                    current: isCurrentSub == "purchase_request",
                },
                {
                    name: "Refund Request",
                    href: "/users/accounting/refunds/my_fund_requests",
                    icon: <FcMoneyTransfer className="h-6 w-6" />,
                    current: isCurrentSub == "refunds",
                },
                {
                    name: "Petty Cash Request",
                    href: "/users/accounting/petty_cash_requests",
                    icon: <FcMoneyTransfer className="h-6 w-6" />,
                    current: isCurrentSub == "petty_cash_requests",
                },

                // {
                //     name: "Voucher Request",
                //     href: "/users/accounting/voucher_request",
                //     icon: <FcNeutralTrading className="h-6 w-6" />,
                //     current: isCurrentSub == "voucher_request",
                // },
                //   {
                //       name: "Daily Expenses",
                //       href: "/users/accounting/expenses/daily_expenses",
                //       icon: <FcCurrencyExchange className="h-6 w-6" />,
                //       current: isCurrentSub == "daily_expenses",
                //   },
                //   {
                //       name: "Expense Reports",
                //       href: "/users/accounting/expenses/expense_reports",
                //       icon: <FcMoneyTransfer className="h-6 w-6" />,
                //       current: isCurrentSub == "expense_reports",
                //   },
            ],
        },
        ...(user.department === "HR Department" ||
        user.department === "Accounting Department"
            ? [
                  {
                      name: "Human Resource",
                      href: "/users/human_resource",
                      icon: <FcConferenceCall className="h-6 w-6" />,
                      current: isCurrentMain == "human_resource",
                      children: [
                          {
                              name: "Incident Report",
                              href: "/users/human_resource/incident_report",
                              icon: <FcHighPriority className="h-6 w-6" />,
                              current: isCurrentSub == "incident_report",
                          },
                      ],
                  },
              ]
            : []),

        ...(user.department === "Engagement Department" ||
        user.department === "Accounting Department"
            ? [
                  {
                      name: "Engagement",
                      href: "/users/engagement",
                      icon: <FcIdea className="h-6 w-6" />,
                      current: isCurrentMain == "engagement",
                      children: [
                          {
                              name: "Calendar Activities",
                              href: "/users/engagement/calendar",
                              icon: <FcCalendar className="h-6 w-6" />,
                              current: isCurrentSub == "calendar",
                          },
                          {
                              name: "Activities & Events",
                              href: "/users/engagement/activities",
                              icon: <FcCollaboration className="h-6 w-6" />,
                              current: isCurrentSub == "activities",
                          },
                          {
                              name: "Announcements",
                              href: "/users/engagement/announcements",
                              icon: <FcAdvertising className="h-6 w-6" />,
                              current: isCurrentSub == "announcements",
                          },
                          {
                              name: "Survey / Poll",
                              href: "/users/engagement/survey",
                              icon: <FcBarChart className="h-6 w-6" />,
                              current: isCurrentSub == "survey",
                          },
                          {
                              name: "News Feed",
                              href: "/users/engagement/news_feed",
                              icon: <FcNews className="h-6 w-6" />,
                              current: isCurrentSub == "news_feed",
                          },
                      ],
                  },
              ]
            : []),

        ...(user.department === "IT Department" ||
        user.department === "Accounting Department"
            ? [
                  {
                      name: "Assets",
                      href: "/users/assets",
                      icon: <FcEngineering className="h-6 w-6" />,
                      current: isCurrentMain == "assets",
                      children: [
                          {
                              name: "Devices",
                              href: "/users/assets/devices",
                              icon: (
                                  <FcMultipleSmartphones className="h-6 w-6" />
                              ),
                              current: isCurrentSub == "devices",
                          },
                          {
                              name: "Monitors",
                              href: "/users/assets/monitors",
                              icon: <FcFrame className="h-6 w-6" />,
                              current: isCurrentSub == "monitors",
                          },
                          {
                              name: "Peripherals",
                              href: "/users/assets/peripherals",
                              icon: <FcTwoSmartphones className="h-6 w-6" />,
                              current: isCurrentSub == "peripherals",
                          },
                          {
                              name: "Other Assets",
                              href: "/users/assets/other_assets",
                              icon: <FcSalesPerformance className="h-6 w-6" />,
                              current: isCurrentSub == "other_assets",
                          },
                          {
                              name: "System Units",
                              href: "/users/assets/system_units",
                              icon: <FcSelfServiceKiosk className="h-6 w-6" />,
                              current: isCurrentSub == "system_units",
                          },
                          {
                              name: "Devices Returns",
                              href: "/users/assets/devices_returns",
                              icon: <FcDownload className="h-6 w-6" />,
                              current: isCurrentSub == "devices_returns",
                          },

                          {
                              name: "Parts & Accessories",
                              href: "/users/assets/parts_accessories",
                              icon: <FcServices className="h-6 w-6" />,
                              current: isCurrentSub == "parts_accessories",
                          },
                      ],
                  },
              ]
            : []),

        // ...(user.department !== "Accounting Department"
        //     ? [
        //           {
        //               name: "Accounting",
        //               href: "/users/accounting",
        //               icon: <FcCalculator className="h-6 w-6" />,
        //               current: isCurrentMain == "accounting",
        //               children: [
        //                   {
        //                       name: "Refund Request",
        //                       href: "/users/accounting/expenses/my_fund_requests",
        //                       icon: <FcMoneyTransfer className="h-6 w-6" />,
        //                       current: isCurrentSub == "expenses",
        //                   },
        //                   {
        //                       name: "Purchase Request",
        //                       href: "/users/accounting/purchase_request/create_purchase_request",
        //                       icon: <FcSurvey className="h-6 w-6" />,
        //                       current: isCurrentSub == "purchase_request",
        //                   },
        //                   //   {
        //                   //       name: "Daily Expenses",
        //                   //       href: "/users/accounting/expenses/daily_expenses",
        //                   //       icon: <FcCurrencyExchange className="h-6 w-6" />,
        //                   //       current: isCurrentSub == "daily_expenses",
        //                   //   },
        //                   //   {
        //                   //       name: "Expense Reports",
        //                   //       href: "/users/accounting/expenses/expense_reports",
        //                   //       icon: <FcMoneyTransfer className="h-6 w-6" />,
        //                   //       current: isCurrentSub == "expense_reports",
        //                   //   },
        //               ],
        //           },
        //       ]
        //     : []),
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
                    <FloatingButtonSection />
                </main>
            </div>
        </>
    );
}
