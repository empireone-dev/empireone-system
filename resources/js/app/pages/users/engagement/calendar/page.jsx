import React, { useEffect } from "react";
import Layout from "../../../users/layout";
import CalendarSection from "./_sections/calendar-section";
import store from "@/app/store/store";
import { get_engagement_calendar_thunk } from "@/app/redux/engagement-thunk";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_engagement_calendar_thunk());
    }, []);
    return (
        <Layout>
            <CalendarSection />
        </Layout>
    );
}
