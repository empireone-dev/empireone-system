import Layout from "@/app/pages/users/layout";
import React from "react";
import StepperSection from "./_sections/stepper-section";
import DescriptionSection from "./_sections/description-section";
import BackSection from "./_sections/back-section";
import CreatePurchaseOrder from "./_sections/create-purchase-order";

export default function Page() {
    return (
        <Layout>
            <div className="flex gap-6">
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <BackSection />
                        <CreatePurchaseOrder />
                    </div>
                    <DescriptionSection />
                </div>
                <div>
                    <StepperSection />
                </div>
            </div>
        </Layout>
    );
}
