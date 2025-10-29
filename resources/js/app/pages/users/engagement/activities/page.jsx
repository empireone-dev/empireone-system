import React, { useEffect } from "react";
import Layout from "../../../users/layout";
import CreateActivitySection from "./_sections/create-activity-section";
import TableSection from "./_sections/table-section";
import store from "@/app/store/store";
import { get_engagement_activities_thunk } from "@/app/redux/engagement-thunk";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_engagement_activities_thunk());
    }, []);

    return (
        <Layout>
            <CreateActivitySection />
            <TableSection />
        </Layout>
    );
}
