import Pagination from "@/app/_components/pagination";
import React from "react";
import { useSelector } from "react-redux";

export default function PaginationSection() {
    const { accounts } = useSelector((store) => store.accounts);
    console.log("accounts", accounts);
    return (
        <>
            <Pagination
                data={accounts}
            />
        </>
    );
}
