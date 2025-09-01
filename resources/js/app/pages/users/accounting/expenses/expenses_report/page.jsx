import React, { useEffect } from "react";
import Layout from "../../../layout";
import TableSection from "./_sections/table-section";
import SearchSection from "./_sections/search-section";
import store from "@/app/store/store";
import { get_expenses_report_thunk } from "@/app/redux/accounting-thunk";
import ExpensesDetailsSection from "./_sections/details-section";
import ExpensesLayout from "../layout";

export default function Page() {
    useEffect(() => {
        store.dispatch(get_expenses_report_thunk());
    }, []);
    return (
        <Layout>
            <ExpensesLayout>
                <div className="flex gap-5 flex-col">
                    <SearchSection />
                    <ExpensesDetailsSection />
                    <TableSection />
                </div>
            </ExpensesLayout>
        </Layout>
    );
}
