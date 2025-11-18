import React from "react";

export default function DetailsSection() {
    return (
        <>
            <div className="px-6 py-6 bg-gray-50 border-b">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Incident Details
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500">IR Number</p>
                        <p className="font-medium text-gray-900">ss</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Employee Name</p>
                        <p className="font-medium text-gray-900">ss</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Incident Date</p>
                        <p className="font-medium text-gray-900">sss</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Infraction</p>
                        <p className="font-medium text-gray-900">sss</p>
                    </div>
                </div>
            </div>

            <div className="px-6 py-6 bg-yellow-50 border-b border-yellow-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span>📋</span> Case Facts / Incident Description
                </h2>
                <div className="bg-white p-4 rounded-lg border border-yellow-300">
                    <p className="text-gray-700 whitespace-pre-wrap">
                        {"No case facts provided."}
                    </p>
                </div>
                <p className="text-sm text-yellow-700 mt-3">
                    <strong>Note:</strong> Please read the case facts above
                    carefully before submitting your explanation.
                </p>
            </div>
        </>
    );
}
