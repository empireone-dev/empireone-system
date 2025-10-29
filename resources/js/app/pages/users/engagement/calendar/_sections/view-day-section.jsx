import { Badge, Modal } from "antd";
import moment from "moment";
import React, { useState } from "react";

export default function ViewDaySection({ data = [] }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                className="w-full h-full text-left focus:outline-none"
                onClick={() => setOpen(true)}
            >
                <ul className="m-0 p-0 list-none">
                    {data.map((item, index) => (
                        <li key={index}>
                            <Badge status={item.type} text={item.content} />
                        </li>
                    ))}
                </ul>
            </button>

            <Modal
                open={open}
                title="🗓 View Day Events"
                footer={null}
                onCancel={() => setOpen(false)}
                width={600}
            >
                <div className="space-y-4">
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
                        >
                            <h4 className="font-semibold text-gray-800 mb-1">
                                {item.name || "Untitled Event"}
                            </h4>
                            <div className="flex items-center justify-end">
                                <h4 className="font-semibold text-gray-800 mb-1">
                                    {moment(item.start).format("LLL")} -{" "}
                                    {moment(item.end).format("LLL")}
                                </h4>
                            </div>
                            <div
                                className="text-gray-700 text-sm prose max-w-none"
                                dangerouslySetInnerHTML={{
                                    __html: item.description || "",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </Modal>
        </>
    );
}
