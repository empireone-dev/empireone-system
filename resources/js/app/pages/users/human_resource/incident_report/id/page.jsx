import React, { useEffect } from "react";
import Layout from "../../../layout";
import store from "@/app/store/store";
import { get_incident_report_by_id_thunk } from "@/app/redux/hr-thunk";
import DetailsSection from "./_sections/details-section";

export default function Page() {
    useEffect(() => {
        store.dispatch(
            get_incident_report_by_id_thunk(
                window.location.pathname.split("/").pop()
            )
        );
    }, []);

    return (
        <Layout>
            <DetailsSection />
        </Layout>
    );
}
