import React, { useEffect } from "react";
import CreatePettyCashSection from "./_sections/create-petty-cash-request-section";
import TableSection from "./_sections/table-section";
import store from "@/app/store/store";
import { get_petty_cash_thunk } from "@/app/redux/accounting-thunk";
import Layout from "../../layout";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_petty_cash_thunk());
    }, []);

    return (
        <Layout>
            <div className="flex flex-col gap-4">
                <div className="w-1/3">
                    <CreatePettyCashSection />
                </div>
                <TableSection />
            </div>
        </Layout>
    );
}
