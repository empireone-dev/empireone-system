import React, { useState, useEffect } from "react";
import { XCircle } from "lucide-react";
import { submit_declined_service } from "@/app/services/accounting-purchase-request";
import SwalAlert from "@/app/_components/swal";

export default function DeclinedFormPage() {
    const [reason, setReason] = useState("");
    const [purchaseId, setPurchaseId] = useState("");
    const [loading, setLoading] = useState(false);
    // Extract Purchase ID from URL
    useEffect(() => {
        const path = window.location.pathname; // e.g. "/api/purchase/PR-092125-143027/decline"
        const segments = path.split("/");
        if (segments.length >= 4) {
            setPurchaseId(segments[3]); // "PR-092125-143027"
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (reason.trim() === "") return;

        const payload = {
            purchaseId,
            reason,
        };

        try {
            await submit_declined_service(payload);
            await SwalAlert({
                type: "success",
            });
            setLoading(false);
            setReason("");
            window.close();
        } catch (error) {
            setLoading(false);
            alert(JSON.stringify(payload, null, 2));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full">
                <div className="text-center">
                    <XCircle className="mx-auto h-16 w-16 text-red-500" />
                    <h1 className="mt-4 text-2xl font-bold text-gray-800">
                        Decline Request
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Please provide a reason for declining the request{" "}
                        <strong>{purchaseId}</strong>.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Enter decline reason..."
                        className="w-full rounded-xl border border-gray-300 p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                        rows={4}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading || reason.trim() === ""}
                        className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
                    >
                        {loading ? "Submitting..." : "Submit Decline Reason"}
                    </button>
                </form>
            </div>
        </div>
    );
}
