"use client";

import { useEffect, useRef, useState } from "react";
import Title from "@/app/_components/title";
import { useSelector } from "react-redux";
import HtmlContent from "@/app/_components/html";
import LogsSection from "./logs-section";
import AddCommentSection from "./add-comment-section";
import ShowFilesSection from "./show-files-section";

export default function DetailsSection() {
    const scrollRef = useRef(null);
    const { ticket } = useSelector((store) => store.tickets);

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.scrollTop = el.scrollHeight;
        }
    }, [ticket?.notes?.length]);
    
    return (
        <>
            <div className="mx-auto max-w-7xl  lg:px-4">
                <div className=" xs:w-1/3 w-full">
                    <Title label={`Details - ${ticket.ticket_id}`} />
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {/* Invoice summary */}
                    {/* Invoice */}

                    <div className="-mx-4 px-4 py-8 h-[78vh]  overflow-auto thin-scrollbar shadow-xs ring-1 ring-gray-900/5 sm:mx-0 sm:rounded-lg sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-16 xl:pt-8 xl:pb-20">
                        <table className="mt-6 w-full text-left text-sm/6 whitespace-nowrap">
                            <thead className="border-b border-gray-200 text-gray-900">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-0 py-3 font-semibold"
                                    >
                                        Ticket ID:
                                    </th>
                                    <th
                                        scope="col"
                                        className="hidden py-3 pr-0 pl-8 text-left font-semibold sm:table-cell"
                                    >
                                        {ticket?.ticket_id}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className="truncate font-medium text-gray-900">
                                            Filed by:
                                        </div>
                                    </td>
                                    <td className="hidden py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.user?.name}
                                    </td>
                                </tr>

                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className="truncate font-medium text-gray-900">
                                            Site:
                                        </div>
                                    </td>
                                    <td className="hidden py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
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
                                        <div className="truncate font-medium text-gray-900">
                                            Assigned To:
                                        </div>
                                    </td>
                                    <td className="hidden py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.assigned_to?.name ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className="truncate font-medium text-gray-900">
                                            Categories
                                        </div>
                                    </td>
                                    <td className="hidden py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.category?.name ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className="truncate font-medium text-gray-900">
                                            Department
                                        </div>
                                    </td>
                                    <td className="hidden py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.category?.department ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className="truncate font-medium text-gray-900">
                                            Department
                                        </div>
                                    </td>
                                    <td className="hidden py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.status ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className="truncate font-medium text-gray-900">
                                            Urgent Type
                                        </div>
                                    </td>
                                    <td className="hidden py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        {ticket?.isUrgent ?? "N/A"}
                                    </td>
                                </tr>
                                <tr className="border-b border-gray-100">
                                    <td className="max-w-0 px-0 py-5 align-top">
                                        <div className="truncate font-medium text-gray-900">
                                            Details
                                        </div>
                                    </td>
                                    <td className="hidden py-5 pr-0 pl-8 text-left align-top text-gray-700 tabular-nums sm:table-cell">
                                        <HtmlContent
                                            html={ticket?.details ?? "<>N/A</>"}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <ShowFilesSection />
                    </div>
                    <div
                     ref={scrollRef}
                    className="h-[64vh]  px-3 thin-scrollbar overflow-auto flex flex-col gap-5">
                     
                        <LogsSection />
                    </div>
                    <AddCommentSection />
                </div>
            </div>
        </>
    );
}
