import Table from "@/app/_components/table";
import { Link } from "@inertiajs/react";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import EditActivitySection from "./edit-activity-section";

export default function TableSection() {
    const { activities } = useSelector((state) => state.engagement);

    const columns = [
        { header: "ID", accessor: "id" },
        { header: "Title", accessor: "name" },
        { header: "Description", accessor: "description" },
        { header: "Start At", accessor: "start_at" },
        { header: "End At", accessor: "end_at" },
        { header: "Status", accessor: "status" },
    ];

    return (
        <>
            <Table
                columns={columns}
                data={activities?.map((res) => {
                    const now = moment();
                    const start = moment(res.start_at);
                    const end = moment(res.end_at);

                    // compute status
                    let status = "";
                    let colorClass = "";

                    if (now.isBefore(start)) {
                        status = "Coming Soon";
                        colorClass = "bg-yellow-100 text-yellow-800";
                    } else if (now.isBetween(start, end, null, "[]")) {
                        status = "Now Event";
                        colorClass = "bg-green-100 text-green-800";
                    } else if (now.isAfter(end)) {
                        status = "Closed";
                        colorClass = "bg-gray-200 text-gray-700";
                    }

                    return {
                        id: <EditActivitySection data={res} />,
                        name: res.name,
                        description: (
                            <div
                                className="text-gray-700 text-sm prose max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html:
                                        res.description &&
                                        res.description.length > 30
                                            ? `${res.description.slice(
                                                  0,
                                                  30
                                              )}...`
                                            : res.description || "",
                                }}
                            />
                        ),
                        start_at: moment(res.start_at).format("LLL"),
                        end_at: moment(res.end_at).format("LLL"),
                        status: (
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}
                            >
                                {status}
                            </span>
                        ),
                    };
                })}
            />
        </>
    );
}
