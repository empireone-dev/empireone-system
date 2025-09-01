import React, { useEffect } from "react";
import Layout from "../../../layout";
import store from "@/app/store/store";
import {
    get_accounting_cash_flows_thunk,
    get_accounting_expenses_thunk,
    get_daily_expenses_thunk,
} from "@/app/redux/accounting-thunk";
import TableSection from "./sections/table-section";
import DailyExpensesDetails from "./sections/daily-expenses-details";
import ExpensesLayout from "../layout";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_daily_expenses_thunk());
        store.dispatch(get_accounting_cash_flows_thunk());
    }, []);
    return (
        <Layout>
            <ExpensesLayout>
                <DailyExpensesDetails />
                <TableSection />
            </ExpensesLayout>
        </Layout>
    );
}
