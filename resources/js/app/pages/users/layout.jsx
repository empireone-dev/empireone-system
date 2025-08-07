import SidebarSection from "@/app/_sections/sidebar-section";
import TopbarSection from "@/app/_sections/topbar-section";
import { get_user_thunk } from "@/app/redux/account-thunk";
import store from "@/app/store/store";
import { useEffect } from "react";
import {
    FcCollaboration,
    FcOnlineSupport,
    FcSupport,
    FcTemplate,
} from "react-icons/fc";
import FloatingButtonSection from "../_sections/floating-button-section";

export default function Layout({ children }) {

    useEffect(() => {
        store.dispatch(get_user_thunk())
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
       
    ];

    const userNavigation = [
        { name: "Your profile", href: "#" },
        { name: "Sign out", href: "#" },
    ];

    // useEffect(()=>{
    //     TicketNotificationSection({
    //         url:"/gif/low.gif",
    //         type:"low"
    //     })
    // },[]);
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
