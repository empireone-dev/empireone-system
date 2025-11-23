import React from "react";

export default function HeaderSection() {
    return (
        <div className="bg-gradient-to-r from-red-700 to-red-800 px-6 py-8">
            <img
                src="https://eo-unified-ims.com/images/logo.png"
                alt="EmpireOne BPO Solutions Inc."
                className="h-[60px] mb-2.5 mx-auto "
            ></img>
            <h1 className="text-lg font-bold text-white mb-2 gap-5 flex justify-center items-center">
                Notice to Explain - Response Form
            </h1>
            <p className="text-red-100 flex justify-center items-center ">
                Please provide your written explanation regarding the incident
                report.
            </p>
        </div>
    );
}
