import React from "react";

export default function HeaderSection() {
    return (
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-8">
            <h1 className="text-3xl font-bold text-white mb-2">
                Notice to Explain - Response Form
            </h1>
            <p className="text-red-100">
                Please provide your written explanation regarding the incident
                report.
            </p>
        </div>
    );
}
