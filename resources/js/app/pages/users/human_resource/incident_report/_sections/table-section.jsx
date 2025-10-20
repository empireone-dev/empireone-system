import Table from "@/app/_components/table";
import { Tag } from "antd";
import moment from "moment";
import React from "react";
import { FcImageFile } from "react-icons/fc";
import { useSelector } from "react-redux";

export default function TableSection() {
    const { irs } = useSelector((state) => state.hr);

    const columns = [
        { header: "Violators", accessor: "violator" },
        { header: "Infraction", accessor: "infraction" },
        { header: "Witness", accessor: "witness" },
        { header: "Date", accessor: "date" },
        { header: "Violation", accessor: "violation" },
        { header: "Details", accessor: "details" },
        { header: "Notes", accessor: "notes" },
        { header: "Files", accessor: "files" },
        { header: "Status", accessor: "status" },
    ];
    console.log("irsss", irs);

    return (
        <>
            <Table
                columns={columns}
                data={irs?.data?.map((res, i) => ({
                    date: moment(res.date).format("LLL"),
                    violator: res.violator,
                    witness: res.witness,
                    infraction: res.infraction,
                    files: res.files,
                    violation: res.violation,
                    details: res.details,
                    status: res.status,
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
