import HeaderSection from "./_sections/header-section";
import DetailsSection from "./_sections/details-section";
import FormSection from "./_sections/form-section";
import { useEffect, useState } from "react";
import axios from "axios";
import { get_incident_report_response_data_service } from "@/app/services/hr-incident-report-service";
import store from "@/app/store/store";
import { get_incident_report_response_data_thunk } from "@/app/redux/hr-thunk";
import { useSelector } from "react-redux";

export default function EmployeeResponsePage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                store.dispatch(get_incident_report_response_data_thunk());
            } catch (err) {
                if (err.response?.status === 403) {
                    setError("This response link has expired or is invalid.");
                } else {
                    setError("Failed to load response form. Please try again.");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Access Denied
                    </h2>
                    <p className="text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    // if (!data) {
    //     return (
    //         <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
    //             <div className="bg-white p-8 rounded-lg shadow-lg text-center">
    //                 <div className="text-6xl mb-4">❌</div>
    //                 <h2 className="text-2xl font-bold text-gray-900 mb-2">
    //                     Failed to Load
    //                 </h2>
    //                 <p className="text-gray-600">
    //                     Unable to load response form. Please try again.
    //                 </p>
    //             </div>
    //         </div>
    //     );
    // }

    // if (has_responded) {
    //     return (
    //         <div className="min-h-screen bg-gray-50 py-8 px-4">
    //             <div className="max-w-4xl mx-auto">
    //                 <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8 text-center">
    //                     <div className="text-6xl mb-4">✅</div>
    //                     <h2 className="text-2xl font-bold text-gray-900 mb-2">
    //                         Response Already Submitted
    //                     </h2>
    //                     <p className="text-gray-600">
    //                         You have already submitted your response to this
    //                         incident report.
    //                     </p>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <HeaderSection />

                    {/* Incident Details */}
                    <DetailsSection />

                    {/* Form */}
                    <FormSection />
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        If you have any questions, please contact HR at
                        hr@empireonegroup.com
                    </p>
                </div>
            </div>
        </div>
    );
}
