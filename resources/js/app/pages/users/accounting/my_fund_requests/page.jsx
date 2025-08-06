import React, { useEffect } from "react";
import Layout from "../../layout";
import CreateFundRequestSection from "./sections/create-fund-request-section";
import TableSection from "./sections/table-section";
import store from "@/app/store/store";
import { get_accounting_expenses_thunk } from "@/app/redux/accounting-thunk";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_accounting_expenses_thunk());
    }, []);

    return (
        <Layout>
            <CreateFundRequestSection />
            {/* <TableSection /> */}
        </Layout>
    );
}
