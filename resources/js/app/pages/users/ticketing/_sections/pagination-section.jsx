import Pagination from "@/app/_components/pagination";
import React from "react";
import { useSelector } from "react-redux";

export default function PaginationSection() {
    const { tickets } = useSelector((store) => store.tickets);
    console.log("tickets", tickets);
    return (
        <>
            <Pagination
                data={tickets}
            />
        </>
    );
}
