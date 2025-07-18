import React, { useEffect, useState } from "react";
import Layout from "../../layout";
import TicketTableSection from "./../_sections/ticket-table-section";
import store from "@/app/store/store";
import { get_tickets_by_user_thunk } from "@/app/redux/ticket-thunk";
import CreateTicketSection from "./_sections/create-ticket-section";
import { get_sites_thunk } from "@/app/redux/site-thunk";
import Skeleton from "@/app/_components/skeleton";
import PaginationSection from "../_sections/pagination-section";
import SearchSection from "../_sections/search-section";

export default function Ticketing() {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function get_data(params) {
            await store.dispatch(get_tickets_by_user_thunk());
            await store.dispatch(get_sites_thunk());
            setLoading(false);
        }
        get_data();
    }, []);
    return (
        <Layout>
            <div className="flex flex-col gap-4 ">
                <div className="w-1/4">
                    <CreateTicketSection />
                </div>
                  <SearchSection />
                {loading ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : (
                    <TicketTableSection />
                )}
                <PaginationSection />
            </div>
        </Layout>
    );
}
