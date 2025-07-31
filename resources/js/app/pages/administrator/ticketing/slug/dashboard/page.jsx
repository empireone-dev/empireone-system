import React, { useEffect } from "react";
import Layout from "../../../layout";
import LocationLayout from "../../location-layout";
import store from "@/app/store/store";
import { get_dashboard_thunk } from "@/app/redux/dashboard-thunk";
import CardSection from "./_sections/card-section";
import { useSelector } from "react-redux";

export default function Page() {
    const location = window.location.pathname.split("/")[3];
    const { dashboard } = useSelector((state) => state.dashboards);

    useEffect(() => {
        store.dispatch(
            get_dashboard_thunk({
                location: location,
            })
        );
    }, []);
    console.log("Dashboard Data:", dashboard);
    return (
        <Layout>
            <LocationLayout>
                <div className="py-3">
                    {dashboard?.length &&
                        dashboard?.map((res) => {
                            return (
                                <div key={res.id}>
                                    <div className="text-2xl font-bold py-3">
                                        {res.department}
                                    </div>
                                    <CardSection dashboard={res} />
                                </div>
                            );
                        })}
                </div>
            </LocationLayout>
        </Layout>
    );
}
