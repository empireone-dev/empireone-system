import Table from "@/app/_components/table";
import { Tag } from "antd";
import moment from "moment";
import React from "react";
import { FcImageFile } from "react-icons/fc";
import { useSelector } from "react-redux";
import ApprovedSection from "./approved-section";
import DeclinedSection from "./declined-section";

export default function TableSection() {
    const { expenses } = useSelector((state) => state.accounting);

    const columns = [
        { header: "Name of Requestor", accessor: "requestor" },
        { header: "Description", accessor: "description" },
        { header: "Receipt Number", accessor: "receipt_number" },
        { header: "Receipt Date", accessor: "date" },
        { header: "Receipt", accessor: "receipt" },
        { header: "Status", accessor: "status" },
        { header: "Action", accessor: "action" },
    ];
    console.log("expensesss", expenses.data);
    function limitString(str, maxLength = 20) {
        return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
    }
    return (
        <>
            <Table
                columns={columns}
                data={expenses?.data?.map((res, i) => ({
                    requestor: res?.user?.name ?? "NONE",
                    description: limitString(res.description),
                    date: moment(res.date).format("LLL"),
                    receipt: (
                        <a
                            href={res.files}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FcImageFile className="h-6 w-6" />
                        </a>
                    ),
                    receipt_number: res.receipt_number,
                    status: (
                        <Tag
                            color={
                                res.status == "Declined"
                                    ? "red"
                                    : res.status == "Pending"
                                    ? "orange"
                                    : "green"
                            }
                            key={i}
                        >
                            {res.status}
                        </Tag>
                    ),
                    action: (
                        <div className="flex items-center justify-center gap-3">
                            <ApprovedSection data={res} />
                            <DeclinedSection data={res} />
                        </div>
                    ),
                }))}
            />
        </>
    );
}
