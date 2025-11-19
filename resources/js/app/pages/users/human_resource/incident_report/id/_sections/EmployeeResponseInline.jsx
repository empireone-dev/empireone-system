// c:\Projects\EmpireOne\unified\resources\js\app\pages\users\human_resource\incident_report\id\_sections\EmployeeResponseInline.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import ShowMoreNotesSection from "./show-more-notes-section";

export default function EmployeeResponseInline({ filesUrl, irId, logId }) {
    const [explanation, setExplanation] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExplanation = async () => {
            try {
                // Fetch the explanation text from S3
                const res = await axios.get(filesUrl);
                setExplanation(res.data);
            } catch (error) {
                console.error('Failed to load explanation:', error);
                setExplanation('Unable to load explanation.');
            } finally {
                setLoading(false);
            }
        };
        fetchExplanation();
    }, [filesUrl]);

    if (loading) {
        return (
            <div className="text-sm text-gray-500 italic">
                Loading employee response...
            </div>
        );
    }

    return (
        <div>
           
            <div className="text-gray-800">
                <ShowMoreNotesSection data={explanation || 'No explanation provided.'} />
            </div>
        </div>
    );
}