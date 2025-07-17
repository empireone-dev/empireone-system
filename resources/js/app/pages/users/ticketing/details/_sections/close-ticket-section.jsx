import Button from "@/app/_components/button";
import React from "react";

export default function CloseTicketSection() {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="danger">
                Assign Ticket
            </Button>
            <Button variant="primary">
                Update Ticket Status
            </Button>
        </div>
    );
}
