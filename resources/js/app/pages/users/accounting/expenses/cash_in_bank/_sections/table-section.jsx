import Table from "@/app/_components/table";
import { Tag } from "antd";
import moment from "moment";
import React from "react";
import { FcImageFile } from "react-icons/fc";
import { useSelector } from "react-redux";

export default function TableSection() {
    const { debit_records } = useSelector((state) => state.accounting);

    const columns = [
        { header: "Name of withdrawer", accessor: "name" },
        { header: "Description", accessor: "description" },
        { header: "Amount", accessor: "amount" },
        { header: "Withdraw Date", accessor: "date" },
    ];
    console.log("debit_recordsss", debit_records);
    function limitString(str, maxLength = 20) {
        return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    }

    return (
        <>
            <Table
                columns={columns}
                data={debit_records?.map((res, i) => ({
                    name: res?.name ?? "NONE",
                    description: limitString(res.description),
                    date: moment(res.date).format("LLL"),
                    amount: res.amount,
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
