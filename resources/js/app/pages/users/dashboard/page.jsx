import React, { useEffect } from "react";
import Layout from "../layout";
import CardSection from "./_sections/card-section";
import store from "@/app/store/store";
import { get_dashboard_thunk } from "@/app/redux/dashboard-thunk";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_dashboard_thunk());
    }, []);

    return (
        <Layout>
            <div className="flex items-center justify-between ">
                <h1 className="text-2xl font-bold">Ticket System</h1>
            </div>
            <CardSection />
        </Layout>
    );
}
