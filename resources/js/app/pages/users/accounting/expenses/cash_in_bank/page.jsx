import React, { useEffect } from "react";
import Layout from "../../../layout";
import ExpensesLayout from "../layout";
import EditCashInBank from "./_sections/edit-cash-in-bank";
import store from "@/app/store/store";
import {
    get_cash_in_bank_thunk,
    get_debit_records_thunk,
} from "@/app/redux/accounting-thunk";
import CardDetails from "./_sections/card-details";
import TableSection from "./_sections/table-section";
import WithdrawCashSection from "./_sections/withdraw-cash-section";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_cash_in_bank_thunk());
        store.dispatch(get_debit_records_thunk());
    }, []);
    return (
        <Layout>
            <ExpensesLayout>
                <div className="flex justify-end gap-3">
                    <WithdrawCashSection />
                    <EditCashInBank />
                </div>
                <CardDetails />
                <TableSection />
            </ExpensesLayout>
        </Layout>
    );
}
