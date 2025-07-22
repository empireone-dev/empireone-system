import Button from "@/app/_components/button";
import React, { useState } from "react";
import ReassignedTicketSection from "./reassigned-ticket-section";
import UpdateTicketStatusSection from "./update-ticket-status-section";

export default function CloseTicketSection() {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <ReassignedTicketSection />
            <UpdateTicketStatusSection />
        </div>
    );
}
