import Table from "@/app/_components/table";
import { department_slug } from "@/app/lib/search-lib";
import { Link } from "@inertiajs/react";
import moment from "moment";
import React from "react";
import { FcFinePrint } from "react-icons/fc";
import { useSelector } from "react-redux";

export default function TicketTableSection() {
    const { tickets } = useSelector((store) => store.tickets);

    const queryParams = new URLSearchParams(window.location.search);
     const page = queryParams.get("page")??'';
    const columns = [
        { header: "Name of Requestor", accessor: "requestor" },
        { header: "Ticket No.", accessor: "ticket_no" },
        { header: "Location", accessor: "location" },
        { header: "Assigned To", accessor: "assigned_to" },
        { header: "Status", accessor: "status" },
        { header: "Date Created", accessor: "date_created" },
        { header: "Action", accessor: "action" },
    ];

    console.log("tickets", tickets);
    return (
        <>
            <Table
                columns={columns}
                data={tickets?.data?.map((res) => ({
                    requestor: res?.user?.name ?? "NONE",
                    location: res.location,
                    date_created: moment(res.created_at).format("LLL"),
                    assigned_to: res?.assigned_to?.name ?? "NONE",
                    ticket_no: res.ticket_id,
                    status: res.status,
                    action: (
                        <Link
                            href={`/users/ticketing/${department_slug().replace(
                                " ",
                                "_"
                            )}/${res.ticket_id}/details?${page ? `page=${page}` : ""}`}
                        >
                            <FcFinePrint className="h-6 w-6" />
                        </Link>
                    ),
                }))}
            />
        </>
    );
}
