import React, { useEffect } from "react";
import Layout from "../../../layout";
import LocationLayout from "../../location-layout";
import StatsTableSection from "./_section.jsx/stats-table-section";
import store from "@/app/store/store";
import { get_stats_thunk } from "@/app/redux/ticket-thunk";
import StatsSearchSection from "./_section.jsx/stats-search-section";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_stats_thunk());
    }, [window.location.search]);
    return (
        <Layout>
            <LocationLayout>
                <div className="py-3">
                    <StatsSearchSection/> 
                    <StatsTableSection />
                </div>
            </LocationLayout>
        </Layout>
    );
}
