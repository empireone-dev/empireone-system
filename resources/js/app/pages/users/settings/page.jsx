import React from "react";
import Layout from "../layout";
import SettingsSection from "@/app/_sections/settings-section";

export default function Page() {
    return (
        <Layout>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Settings</h1>
            </div>
            <SettingsSection />
        </Layout>
    );
}
