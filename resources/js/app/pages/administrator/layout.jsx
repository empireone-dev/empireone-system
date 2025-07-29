import SidebarSection from "@/app/_sections/sidebar-section";
import TopbarSection from "@/app/_sections/topbar-section";
import {
    FcAssistant,
    FcConferenceCall,
    FcHome,
    FcLibrary,
    FcList,
    FcOrganization,
    FcPortraitMode,
    FcPrivacy,
    FcSupport,
    FcTemplate,
    FcTimeline,
} from "react-icons/fc";
import FloatingButtonSection from "./_sections/floating-button-section";
import { useEffect } from "react";
import store from "@/app/store/store";
import { get_user_thunk } from "@/app/redux/account-thunk";

export default function Layout({ children }) {
    const isCurrentMain = window.location.pathname.split("/")[2];
    const isCurrentSub = window.location.pathname.split("/")[3];

    useEffect(() => {
        store.dispatch(get_user_thunk());
    }, []);
    const navigation = [
        {
            name: "Dashboard",
            href: "/administrator/dashboard",
            icon: <FcTemplate className="h-6 w-6" />,
            current: isCurrentMain == "dashboard",
        },

        {
            name: "Departments",
            href: "#",
            icon: <FcConferenceCall className="h-6 w-6" />,
            current: isCurrentMain == "users",
            children: [
                {
                    name: "IT Department",

                    href: "/administrator/users/IT_Department",
                    icon: <FcPortraitMode className="h-6 w-6" />,
                    current: isCurrentSub == "IT_Department",
                },

                {
                    name: "HR Department",
                    href: "/administrator/users/HR_Department",
                    icon: <FcPortraitMode className="h-6 w-6" />,
                    current: isCurrentSub == "HR_Department",
                },

                {
                    name: "QA Department",
                    href: "/administrator/users/QA_Department",
                    icon: <FcPortraitMode className="h-6 w-6" />,
                    current: isCurrentSub == "QA_Department",
                },
                {
                    name: "Operations Department",
                    href: "/administrator/users/Operations_Department",
                    icon: <FcPortraitMode className="h-6 w-6" />,
                    current: isCurrentSub == "Operations_Department",
                },
                {
                    name: "Compliance Department",
                    href: "/administrator/users/Compliance_Department",
                    icon: <FcPortraitMode className="h-6 w-6" />,
                    current: isCurrentSub == "Compliance_Department",
                },

                {
                    name: "Accounting Department",
                    href: "/administrator/users/Accounting_Department",
                    icon: <FcPortraitMode className="h-6 w-6" />,
                    current: isCurrentSub == "Accounting_Department",
                },
                {
                    name: "Engagement Department",
                    href: "/administrator/users/Engagement_Department",
                    icon: <FcPortraitMode className="h-6 w-6" />,
                    current: isCurrentSub == "Engagement_Department",
                },
            ],
        },

        {
            name: "Ticketing",
            href: "#",
            icon: <FcSupport className="h-6 w-6" />,
            current: isCurrentMain == "ticketing",
            children: [
                {
                    name: "Categories",
                    href: "/administrator/ticketing/categories?department=IT Department",
                    icon: <FcTimeline className="h-6 w-6" />,
                    current: isCurrentSub == "categories",
                },
                {
                    name: "Carcar",

                    href: "/administrator/ticketing/carcar/tickets",
                    icon: <FcHome className="h-6 w-6" />,
                    current: isCurrentSub == "carcar",
                },
                {
                    name: "San Carlos",
                    href: "/administrator/ticketing/san_carlos/tickets",
                    icon: <FcHome className="h-6 w-6" />,
                    current: isCurrentSub == "san_carlos",
                },
            ],
        },
        //  {
        //     name: "Inventory",
        //     href: "#",
        //     icon: <FcOrganization className="h-6 w-6" />,
        //     current: isCurrentMain == "ticketing",
        //     children: [
        //         {
        //             name: "Carcar",

        //             href: "/administrator/ticketing/carcar/tickets",
        //             icon: <FcHome className="h-6 w-6" />,
        //             current: isCurrentSub == "carcar",
        //         },
        //         {
        //             name: "San Carlos",
        //             href: "/administrator/ticketing/san_carlos/tickets",
        //             icon: <FcHome className="h-6 w-6" />,
        //             current: isCurrentSub == "san_carlos",
        //         },
        //     ],
        // },
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
                    <div>{children}</div>
                    {/* <FloatingButtonSection /> */}
                </main>
            </div>
        </>
    );
}
