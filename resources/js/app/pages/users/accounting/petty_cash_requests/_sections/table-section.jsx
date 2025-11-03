import Table from "@/app/_components/table";
import { Tag } from "antd";
import moment from "moment";
import React from "react";
import { FcImageFile } from "react-icons/fc";
import { useSelector } from "react-redux";

export default function TableSection() {
    const { pettycashes } = useSelector((state) => state.accounting);

    const columns = [
        { header: "Name of Requestor", accessor: "requestor" },
        { header: "Description", accessor: "description" },
        { header: "Petty ID", accessor: "receipt_number" },
        { header: "Petty Cash Date", accessor: "date" },
        { header: "Receipt", accessor: "receipt" },
        { header: "Status", accessor: "status" },
        { header: "Delete", accessor: "action" },
    ];
    console.log("pettycashesss", pettycashes.data);
    function limitString(str, maxLength = 20) {
        return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    }
    return (
        <>
            <Table
                columns={columns}
                data={pettycashes?.data?.map((res, i) => ({
                    requestor: res?.user?.name ?? "NONE",
                    description: limitString(res?.description),
                    date: moment(res?.date).format("LLL"),
                    receipt: (
                        <a
                            href={res?.files}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FcImageFile className="h-6 w-6" />
                        </a>
                    ),
                    receipt_number: res?.receipt_number,
                    status: (
                        <Tag
                            color={
                                res?.status == "Declined"
                                    ? "red"
                                    : res?.status == "Pending"
                                    ? "orange"
                                    : "green"
                            }
                            key={i}
                        >
                            {res?.status}
                        </Tag>
                    ),
                    // action: (
                    //     <Link
                    //         href={`/users/ticketing/${department_slug().replace(
                    //             " ",
                    //             "_"
                    //         )}/${res?.ticket_id}/details?${
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
