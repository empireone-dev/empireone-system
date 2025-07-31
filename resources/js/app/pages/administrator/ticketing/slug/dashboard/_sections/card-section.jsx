import Card from "@/app/_components/card";
import React from "react";
import {
    FcAddDatabase,
    FcApproval,
    FcBarChart,
    FcCancel,
    FcClock,
    FcFeedback,
    FcOvertime,
} from "react-icons/fc";
import { useSelector } from "react-redux";

export default function CardSection({dashboard}) {
    
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-9 lg:gap-8">
            
          
           
            <Card
                title="Internal Pending Tickets"
                icon={<FcOvertime className="text-5xl" />}
                href="#"
                count={dashboard.internal_pending ?? "0"}
            />
            <Card
                title="Internal Tickets Closed"
                icon={<FcApproval className="text-5xl" />}
                href="#"
                count={dashboard.internal_closed ?? "0"}
            />
            <Card
                title="Internal Overall Tickets"
                icon={<FcBarChart className="text-5xl" />}
                href="#"
                count={dashboard.internal_overall ?? "0"}
            />
        </div>
    );
}
