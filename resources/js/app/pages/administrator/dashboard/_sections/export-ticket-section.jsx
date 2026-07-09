import React, { useState } from 'react'
import Button from '@/app/_components/button'
import axios from 'axios'

export default function ExportTicketSection() {
    // Added a loading state so the user knows something is happening
    const [isExporting, setIsExporting] = useState(false);

    async function export_ticket() {
        try {
            setIsExporting(true);

            // 1. Tell Axios to expect a blob (file) response
            const response = await axios.get(`/api/export_ticket${window.location.search}`, {
                responseType: 'blob', 
            });

            // 2. Create a Blob object from the response data
            const blob = new Blob([response.data], { type: 'text/csv' });

            // 3. Create a temporary URL for the blob
            const url = window.URL.createObjectURL(blob);

            // 4. Create an invisible anchor tag to trigger the download
            const link = document.createElement('a');
            link.href = url;
            
            // You can also extract the filename from the response headers if you passed it dynamically from Laravel
            link.setAttribute('download', 'tickets_export.csv'); 
            
            // 5. Append to body, click it, and immediately clean it up
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error("Failed to export tickets:", error);
            alert("There was an error downloading your export.");
        } finally {
            setIsExporting(false);
        }
    }

    return (
        <div>
            <Button
                onClick={export_ticket}
                loading={isExporting}
            >
                {isExporting ? 'Exporting...' : 'Export Ticket'}
            </Button>
        </div>
    )
}