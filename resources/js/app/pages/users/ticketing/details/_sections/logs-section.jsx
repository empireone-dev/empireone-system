import moment from "moment";
import React, { useState } from "react";
import { FcAssistant, FcClock } from "react-icons/fc";
import { useSelector } from "react-redux";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}
export default function LogsSection() {
    const { ticket } = useSelector((store) => store.tickets);

    const mergedList = [
        ...(ticket?.notes || []),
        ...(ticket?.activities || []),
    ].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

    function htmlToText(html) {
        const temp = document.createElement("div");
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || "";
    }

    return (
        <div className="lg:col-start-3">
            {/* Activity feed */}
            <h2 className="text-sm/6 font-semibold text-gray-900">LOGS</h2>
            <ul role="list" className="space-y-6">
                {mergedList?.map((res, i) => (
                    <li key={res?.id} className="relative flex gap-x-4">
                        <div
                            className={classNames(
                                i === res.length - 1 ? "h-6" : "-bottom-6",
                                "absolute top-0 left-0 flex w-6 justify-center"
                            )}
                        >
                            <div className="w-px bg-gray-200" />
                        </div>
                        <>
                            {res.notes ? (
                                <FcAssistant className="relative mt-3 size-6 flex-none rounded-full bg-gray-50" />
                            ) : (
                                <img src="/images/robot_head.png" className="relative h-6 mt-2 text-center" alt="" />
                                // <FcClock className="relative mt-3 size-6 flex-none rounded-full bg-gray-50" />
                            )}
                            <div className="flex-auto relative bg-white rounded-lg p-3 ring-1 ring-gray-300 ring-inset before:content-[''] before:absolute before:left-[-8px] before:top-3 before:w-0 before:h-0 before:border-t-[8px] before:border-t-transparent before:border-r-[8px] before:border-r-gray-300 before:border-b-[8px] before:border-b-transparent after:content-[''] after:absolute after:left-[-7px] after:top-3 after:w-0 after:h-0 after:border-t-[8px] after:border-t-transparent after:border-r-[8px] after:border-r-white after:border-b-[8px] after:border-b-transparent">
                                <div className="flex justify-between gap-x-4">
                                    <div className="py-0.5 text-xs/5 text-gray-500">
                                        <span className="font-medium text-gray-900">
                                            {res?.user?.name ?? " EO-AI Bot"}:
                                        </span>{" "}
                                        {/* {res.notes ? res.notes : res.message} */}
                                        <div
                                            className="py-0.5 text-xs/5 text-gray-500"
                                            dangerouslySetInnerHTML={{ __html: res.notes || res.message }}
                                        />
                                    </div>
                                    <time
                                        dateTime={moment(
                                            res?.created_at
                                        ).fromNow()}
                                        className="flex-none py-0.5 text-xs/5 text-gray-500"
                                    >
                                        {moment(res?.created_at).fromNow()}
                                    </time>
                                </div>
                                <p className="text-sm/6 text-gray-500">
                                    {res?.comment}
                                </p>
                            </div>
                        </>
                    </li>
                ))}
            </ul>

            {/* New comment form */}
        </div>
    );
}
