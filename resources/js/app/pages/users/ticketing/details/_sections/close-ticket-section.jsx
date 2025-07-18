import Button from "@/app/_components/button";
import React, { useState } from "react";
import ReassignedTicketSection from "./reassigned-ticket-section";

export default function CloseTicketSection() {

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <ReassignedTicketSection />

            <Button variant="primary">Update Ticket Status</Button>
        </div>
    );
}
