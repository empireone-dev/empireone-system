import Modal from "@/app/_components/modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FolderIcon } from "lucide-react";
import React, { useState } from "react";

export default function ShowFileSection({ data }) {
    const [open, setOpen] = useState(false);
    return (
        <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            title="Uploaded Files"
            width="w-1/2"
        >
            <div className="p-6 overflow-y-auto max-h-[60vh]">
                {data?.evidence && data?.evidence.length > 0 ? (
                    <div className="space-y-3">
                        {data?.evidence.map((res, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-3">
                                    <FolderIcon className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {res.files || `File ${index + 1}`}
                                        </p>
                                        {res.created_at && (
                                            <p className="text-sm text-gray-500">
                                                Uploaded:{" "}
                                                {new Date(
                                                    res.created_at
                                                ).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <a
                                    href={res.file}
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
                    <p className="text-center text-gray-500 py-8">
                        No files uploaded
                    </p>
                )}
            </div>
        </Modal>
    );
}
