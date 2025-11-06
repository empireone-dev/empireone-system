import React, { useEffect } from "react";
import Layout from "../../../layout";
import store from "@/app/store/store";
import { get_incident_report_by_id_thunk } from "@/app/redux/hr-thunk";
import DetailsSection from "./_sections/details-section";
import StepperSection from "./_sections/stepper-section";
import HRActionsSection from "./_sections/hr-actions-section";

export default function Page() {
    useEffect(() => {
        store.dispatch(
            get_incident_report_by_id_thunk(
                window.location.pathname.split("/").pop()
            )
        );
    }, []);

    return (
        <Layout>
            <div className="px-6 py-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Details Section - Takes 2 columns (left side) */}
                    <div className="lg:col-span-2">
                        <DetailsSection />
                    </div>
                    
                    {/* Right Sidebar - Takes 1 column */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* HR Actions */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <HRActionsSection />
                        </div>
                        
                        {/* Stepper */}
                        <div className="bg-white p-4 rounded-lg shadow">
                            <StepperSection />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
