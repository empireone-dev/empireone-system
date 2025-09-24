import { department_slug } from "@/app/lib/search-lib";
import { Link } from "@inertiajs/react";
import React from "react";
import { FcUpLeft } from "react-icons/fc";
import FileUploadButton from "./file-upload-button";
import StatusUpdateButton from "./status-update-button";

export default function BackSection() {
    return (
        <div>
            <Link
                href={`/users/accounting/purchase_request?page=${1}`}
                className=" flex gap-3 text-2xl font-semibold text-gray-900 my-3"
            >
                <FcUpLeft /> Back
            </Link>
            
        </div>
    );
}
