import Table from "@/app/_components/table";
import { Link } from "@inertiajs/react";
import { Tag } from "antd";
import moment from "moment";
import React from "react";
import { FcImageFile } from "react-icons/fc";
import { useSelector } from "react-redux";

export default function TableSection() {
    const { irs } = useSelector((state) => state.hr);

    const columns = [
        { header: "id", accessor: "id" },
        { header: "Violators", accessor: "violator" },
        { header: "Infraction", accessor: "infraction" },
        { header: "Witness", accessor: "witness" },
        { header: "Date", accessor: "date" },
        // { header: "Violation", accessor: "violation" },
        { header: "Details", accessor: "details" },
        // { header: "Notes", accessor: "notes" },
        // { header: "Files", accessor: "files" },
        { header: "Status", accessor: "status" },
    ];

    // Helper to get status color
    const getStatusColor = (status) => {
        if (!status) return "default";

        const statusLower = status.toLowerCase();

        if (
            statusLower.includes("invalid") ||
            statusLower.includes("declined")
        ) {
            return "red";
        }

        if (
            statusLower.includes("closed") ||
            statusLower.includes("nod issued")
        ) {
            return "green";
        }

        if (
            statusLower.includes("pending") ||
            statusLower.includes("awaiting") ||
            statusLower.includes("submitted")
        ) {
            return "gold";
        }

        if (
            statusLower.includes("valid") ||
            statusLower.includes("nte served") ||
            statusLower.includes("response")
        ) {
            return "blue";
        }

        if (statusLower.includes("review") || statusLower.includes("hearing")) {
            return "purple";
        }

        return "default";
    };

    console.log("irsss", irs);

    return (
        <>
            <Table
                columns={columns}
                data={irs?.data?.map((res, i) => ({
                    id: (
                        <Link
                            className="underline text-blue-600"
                            href={`/users/human_resource/incident_report/${res.id}`}
                        >
                            IR-{res.id + moment().format("mdy")}
                        </Link>
                    ),
                    date: moment(res.date).format("LLL"),
                    violator: res.violator,
                    witness: res.witness,
                    infraction: res.infraction,
                    // files: res.files,
                    // violation: res.violation,
                    details: res.details,
                    status: (
                        <Tag color={getStatusColor(res.status)}>
                            {res.status}
                        </Tag>
                    ),
                    notes: res.notes,
                    // action: (
                    //     <Link
                    //         href={`/users/ticketing/${department_slug().replace(
                    //             " ",
                    //             "_"
                    //         )}/${res.ticket_id}/details?${
                    //             page ? `page=${page}` : ""
                    //         }`}
                    //     >
                    //         <FcFinePrint className="h-6 w-6" />
                    //     </Link>
                    // ),
                }))}
            />
        </>
    );
}
