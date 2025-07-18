import React, { useEffect, useState } from "react";
import DetailsSection from "./_sections/details-section";
import store from "@/app/store/store";
import { get_tickets_by_id_thunk } from "@/app/redux/ticket-thunk";
import { ticket_id } from "@/app/lib/search-lib";
import Skeleton from "@/app/_components/skeleton";
import Layout from "../../layout";
import { useSelector } from "react-redux";
import browser_notification from "@/app/lib/browser-notification";

export default function Page() {
    const { load } = useSelector((store) => store.app);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        async function get_data(params) {
            await store.dispatch(get_tickets_by_id_thunk(ticket_id()));
            setLoading(false);
        }
        get_data();
    }, [load]);


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
                <DetailsSection />
            )}
        </Layout>
    );
}
