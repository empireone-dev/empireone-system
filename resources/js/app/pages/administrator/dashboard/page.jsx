import React, { useEffect, useState } from "react";
import Layout from "../layout";
import StatsTableSection from "../ticketing/slug/stats/_section.jsx/stats-table-section";
import StatsSearchSection from "../ticketing/slug/stats/_section.jsx/stats-search-section";
import store from "@/app/store/store";
import { get_stats_thunk } from "@/app/redux/ticket-thunk";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_stats_thunk());
    }, [window.location.search]);
    return (
        <Layout>
            <div className="py-3">
                <StatsSearchSection />
                <StatsTableSection />
            </div>
        </Layout>
    );
}
