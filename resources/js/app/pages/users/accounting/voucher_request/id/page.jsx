import React from "react";
import Layout from "../../../layout";
import DescriptionSection from "./_sections/description-section";
import BackSection from "./_sections/back-section";
import StepperSection from "./_sections/stepper-section";

export default function Page() {
    return (
        <Layout>
            <div className="flex gap-6">
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <BackSection />
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
