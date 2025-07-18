import { PaperClipIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux";

export default function ShowFilesSection() {
    const { ticket } = useSelector((store) => store.tickets);
    return (
        <>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                    Attachments
                </dt>
                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                    <ul
                        role="list"
                        className="divide-y divide-gray-100 rounded-md border border-gray-200"
                    >
                        {ticket?.files?.map((res) => {
                            return (
                                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm/6">
                                    <div className="flex w-0 flex-1 items-center">
                                        <PaperClipIcon
                                            aria-hidden="true"
                                            className="size-5 shrink-0 text-gray-400"
                                        />
                                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                            <span className="truncate font-medium text-gray-900">
                                                {res.url}
                                            </span>
                                            <span className="shrink-0 text-gray-400">
                                                4.5mb
                                            </span>
                                        </div>
                                    </div>
                                    <div className="ml-4 shrink-0">
                                        <a
                                            target="_blank"
                                            href={res.url}
                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                        >
                                            Show
                                        </a>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </dd>
            </div>
        </>
    );
}
