import Layout from "@/app/pages/users/layout";
import { incident_report_thunk } from "@/app/redux/hr-thunk";
import store from "@/app/store/store";
import React, { useEffect } from "react";
import TableSection from "./_sections/table-section";

export default function Page() {
    useEffect(() => {
        store.dispatch(incident_report_thunk());
    }, []);
    return (
        <Layout>
            <TableSection />
        </Layout>
    );
}
