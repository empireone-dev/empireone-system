import Table from "@/app/_components/table";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

export default function CategoryTableSection() {
    const { categories } = useSelector((store) => store.categories);
    const columns = [
        { header: "Name of Categories", accessor: "name" },
        { header: "Department", accessor: "department" },
        { header: "Created At", accessor: "created_at" },
    ];

    return (
        <>
            <Table
                columns={columns}
                data={categories?.map((res) => ({
                    name: res?.name ?? "NONE",
                    department: res?.department,
                    created_at: moment(res?.created_at).format("LLL"),
                    action: <>Proceed</>,
                }))}
            />
        </>
    );
}
