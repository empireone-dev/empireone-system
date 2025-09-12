"use client";

import { useEffect, useRef, useState } from "react";
import Title from "@/app/_components/title";
import { useSelector } from "react-redux";
import HtmlContent from "@/app/_components/html";
import LogsSection from "./logs-section";
import AddCommentSection from "./add-comment-section";
import { Link } from "@inertiajs/react";
import { department_slug } from "@/app/lib/search-lib";
import { FcUpLeft } from "react-icons/fc";
import CloseTicketSection from "./close-ticket-section";
import { FolderIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function DetailsSection() {
    const scrollRef = useRef(null);
    const { ticket } = useSelector((store) => store.tickets);
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page") ?? "";
    const [showFilesModal, setShowFilesModal] = useState(false);
    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [ticket?.notes?.length]);

    console.log("ticket", ticket);

    return (
        <>
            <div className="px-6 w-full">
                <div className="w-full items-center  flex-col sm:flex-row  justify-between flex gap-10">
                    <Link
                        href={`/users/ticketing/${department_slug().replace(
                            " ",
                            "_"
                        )}?page=${page}`}
                        className=" flex gap-3 text-2xl font-semibold text-gray-900 my-3"
                    >
                        <FcUpLeft /> Back
                    </Link>
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                        <div>
                            {ticket?.status == "Pending" && (
                                <CloseTicketSection />
                            )}
                        </div>
                        <Title label={`Details - ${ticket.ticket_id}`} />
                    </div>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {/* Invoice summary */}
                    {/* Invoice */}

                    <div className="-mx-4 px-4 py-8 h-[78vh]  overflow-auto thin-scrollbar shadow-xs ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pt-8 xl:pb-20">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-0 py-3 font-semibold"
                                    >
                                        Ticket ID:
                                    </th>
                                    <th
                                        scope="col"
                                        className=" py-3 pr-0 pl-8 text-left font-semibold sm:table-cell"
                                    >
                                        {ticket?.ticket_id}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className=" font-medium text-gray-900">
                                            Filed by:
                                        </div>
                                    </td>
                                    <td className=" py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.user?.name}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className=" font-medium text-gray-900">
                                            Site:
                                        </div>
                                    </td>
                                    <td className=" py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.site?.name ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className="truncate font-medium text-gray-900">
                                            Station / Room etc.:
                                        </div>
                                    </td>
                                    <td className="hidden py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.station ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className=" font-medium text-gray-900">
                                            Assigned To:
                                        </div>
                                    </td>
                                    <td className=" py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.assigned_to?.name ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className=" font-medium text-gray-900">
                                            Categories
                                        </div>
                                    </td>
                                    <td className=" py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.category?.name ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className=" font-medium text-gray-900">
                                            Department Request
                                        </div>
                                    </td>
                                    <td className=" py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.category?.department ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className=" font-medium text-gray-900">
                                            Department Assigned
                                        </div>
                                    </td>
                                    <td className=" py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.department ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className=" font-medium text-gray-900">
                                            Status
                                        </div>
                                    </td>
                                    <td className=" py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.status ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className=" font-medium text-gray-900">
                                            Urgent Type
                                        </div>
                                    </td>
                                    <td className=" py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.isUrgent ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className=" font-medium text-gray-900">
                                            Details
                                        </div>
                                    </td>
                                    <td className=" py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        <HtmlContent
                                            html={ticket?.details ?? "<>N/A</>"}
                                        />
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className=" font-medium text-gray-900">
                                            Files Uploaded:
                                        </div>
                                    </td>
                                    <td className=" py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.files && ticket?.files.length > 0 ? (
                                            <div className="flex items-center gap-2">
                                                <span>{ticket.files.length} file(s) uploaded</span>
                                                <button 
                                                    onClick={() => setShowFilesModal(true)}
                                                    className="hover:text-blue-600 transition-colors"
                                                    title="View uploaded files"
                                                >
                                                    <FolderIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <span>N/A</span>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div
                        ref={scrollRef}
                        className="h-[64vh]  px-3 thin-scrollbar overflow-auto flex flex-col gap-5"
                    >
                        <LogsSection />
                    </div>
                    <AddCommentSection />
                </div>
            </div>

            {/* Files Modal */}
            {showFilesModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Uploaded Files ({ticket?.files?.length || 0})
                            </h3>
                            <button
                                onClick={() => setShowFilesModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            {ticket?.files && ticket?.files.length > 0 ? (
                                <div className="space-y-3">
                                    {ticket.files.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                            <div className="flex items-center gap-3">
                                                <FolderIcon className="w-5 h-5 text-gray-500" />
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {file.files_from || `File ${index + 1}`}
                                                    </p>
                                                    {file.created_at && (
                                                        <p className="text-sm text-gray-500">
                                                            Uploaded: {new Date(file.created_at).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                            <a
                                                href={file.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                                            >
                                                View File
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500 py-8">No files uploaded</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
