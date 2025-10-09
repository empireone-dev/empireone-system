import React from "react";
import ExpensesTabsSection from "./_sections/expenses-tabs-section";

export default function ExpensesLayout({children}) {
    return (
        <div className="flex flex-col gap-4">
            <ExpensesTabsSection />
            {children}
        </div>
    );
}
