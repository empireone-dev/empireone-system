import React, { useEffect } from "react";
import Layout from "../../layout";
import store from "@/app/store/store";
import {
    get_accounting_cash_flows_thunk,
    get_accounting_expenses_thunk,
} from "@/app/redux/accounting-thunk";
import TableSection from "./sections/table-section";
import DailyExpensesDetails from "./sections/daily-expenses-details";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_accounting_expenses_thunk({ status: "Approved" }));
        store.dispatch(get_accounting_cash_flows_thunk());
    }, []);
    return (
        <Layout>
            <DailyExpensesDetails />
            <TableSection />
        </Layout>
    );
}
