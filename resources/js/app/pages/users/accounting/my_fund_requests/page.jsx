import React, { useEffect } from "react";
import Layout from "../../layout";
import CreateFundRequestSection from "./sections/create-fund-request-section";
import TableSection from "./sections/table-section";
import store from "@/app/store/store";
import {  get_my_fund_request_thunk } from "@/app/redux/accounting-thunk";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_my_fund_request_thunk());
    }, []);

    return (
        <Layout>
           <div className="flex flex-col gap-4">
             <div className="w-1/3">
                <CreateFundRequestSection />
             </div>
            <TableSection />
           </div>
        </Layout>
    );
}
