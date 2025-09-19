import Layout from "@/app/pages/users/layout";
import React, { useEffect } from "react";
import StepperSection from "./_sections/stepper-section";
import DescriptionSection from "./_sections/description-section";
import BackSection from "./_sections/back-section";
import CreatePurchaseOrder from "./_sections/create-purchase-order";
import store from "@/app/store/store";
import { get_purchase_request_by_id_thunk } from "@/app/redux/accounting-thunk";

export default function Page() {

    useEffect(()=>{
        store.dispatch(get_purchase_request_by_id_thunk(window.location.pathname.split('/')[4]))
    },[])
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
