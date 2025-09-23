import Pagination from "@/app/_components/pagination";
import React from "react";
import { useSelector } from "react-redux";

export default function PaginationSection() {
    const { purchase_requests } = useSelector((store) => store.accounting);

    console.log("purchase_requests", purchase_requests.data);
    return (
        <>
            <Pagination data={purchase_requests} />
        </>
    );
}
