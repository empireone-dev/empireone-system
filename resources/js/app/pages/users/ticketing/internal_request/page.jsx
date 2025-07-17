import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import TicketTableSection from "./../_sections/ticket-table-section";
// import PaginationSection from "./_sections/pagination-section";
import store from "@/app/store/store";
import { get_tickets_by_internal_thunk } from "@/app/redux/ticket-thunk";
import Skeleton from "@/app/_components/skeleton";

export default function Ticketing() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function get_data(params) {
            await store.dispatch(get_tickets_by_internal_thunk());
            setLoading(false);
        }
        get_data();
    }, []);
    return (
        <Layout>
            {loading ? (
                <>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                </>
            ) : (
                <TicketTableSection />
            )}

            {/* <PaginationSection /> */}
        </Layout>
    );
}
