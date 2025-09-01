import React from "react";
import PurchaseRequestTabsSection from "./_sections/expenses-tabs-section";

export default function PurchaseRequestLayout({ children }) {
    return (
        <div className="flex flex-col gap-4">
            <PurchaseRequestTabsSection />
            {children}
        </div>
    );
}
