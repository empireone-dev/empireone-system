import React, { useEffect, useState } from "react";
import Layout from "../../../layout";
import DetailsSection from "./_sections/details-section";
import store from "@/app/store/store";
import { get_tickets_by_id_thunk } from "@/app/redux/ticket-thunk";
import { ticket_id } from "@/app/lib/search-lib";
import Skeleton from "@/app/_components/skeleton";
import { useSelector } from "react-redux";

export default function Page() {
    const [loading, setLoading] = useState(true);
    const { load } = useSelector((store) => store.app);

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
