import { useEffect, useRef, useState } from "react";
import Title from "@/app/_components/title";
import { useSelector } from "react-redux";
import { Link } from "@inertiajs/react";
import { department_slug } from "@/app/lib/search-lib";
import { FcUpLeft } from "react-icons/fc";
import { FolderIcon, XMarkIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import StepperSection from "./stepper-section";
import HRActionsSection from "./hr-actions-section";

export default function DetailsSection() {
    const { ir } = useSelector((store) => store.hr);
    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get("page") ?? "1";
    const [showFilesModal, setShowFilesModal] = useState(false);

    console.log("ir", ir);

    return (
        <>
            <div className="px-6 w-full">
                <div className="w-full items-center flex-col sm:flex-row justify-between flex gap-10">
                    <Link
                        href={`/users/human_resource/${department_slug().replace(
                            " ",
                            "_"
                        )}?page=${page}`}
                        className="flex gap-3 text-2xl font-semibold text-gray-900 my-3"
                    >
                        <FcUpLeft /> Back
                    </Link>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Left Column - Incident Report Details */}
                    <div className="lg:col-span-2">
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-6">
                                Incident Report Details
                            </h2>

                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                                    <div className="font-medium text-gray-900">
                                        INCIDENT REPORT ID:
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {`IR${ir?.id ?? "1"}-${moment().format(
                                            "mdy"
                                        )}`}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                                    <div className="font-medium text-gray-900">
                                        Filed by:
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {ir?.filed_by?.name ?? "N/A"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                                    <div className="font-medium text-gray-900">
                                        Violator:
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {ir?.violator ?? "N/A"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                                    <div className="font-medium text-gray-900">
                                        Site:
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {ir?.filed_by?.location ?? "N/A"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                                    <div className="font-medium text-gray-900">
                                        Witness
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {ir?.witness ?? "N/A"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                                    <div className="font-medium text-gray-900">
                                        Incident Date
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {moment(ir?.date).format("LL") ?? "N/A"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                                    <div className="font-medium text-gray-900">
                                        Infraction
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {ir?.infraction ?? "N/A"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                                    <div className="font-medium text-gray-900">
                                        Details
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {ir?.details ?? "N/A"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                                    <div className="font-medium text-gray-900">
                                        Additional Notes
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {ir?.notes ?? "N/A"}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 py-3">
                                    <div className="font-medium text-gray-900">
                                        Files Uploaded:
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {ir?.evidence &&
                                        ir?.evidence.length > 0 ? (
                                            <div className="flex items-center gap-2">
                                                <span>
                                                    {ir?.evidence.length}{" "}
                                                    file(s) uploaded
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        setShowFilesModal(true)
                                                    }
                                                    className="hover:text-blue-600 transition-colors"
                                                    title="View uploaded files"
                                                >
                                                    <FolderIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <span>N/A</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Workflow Progress & Actions */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex items-center justify-between">
                            <Title
                                label={`Incident Report - ${
                                    ir?.id ?? "1"
                                }-${moment().format("mdy")}`}
                            />
                        </div>
                        {/* Workflow Stepper */}
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
                            <StepperSection />
                        </div>

                        {/* HR Actions */}
                        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg p-6">
                            <HRActionsSection />
                        </div>
                    </div>
                </div>
            </div>

            {/* Files Modal */}
            {showFilesModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h3 className="text-lg font-semibold text-gray-900">
                                Uploaded Files ({ir?.evidence?.length || 0})
                            </h3>
                            <button
                                onClick={() => setShowFilesModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto max-h-[60vh]">
                            {ir?.evidence && ir?.evidence.length > 0 ? (
                                <div className="space-y-3">
                                    {ir?.evidence.map((res, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                                        >
                                            <div className="flex items-center gap-3">
                                                <FolderIcon className="w-5 h-5 text-gray-500" />
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {res.files ||
                                                            `File ${index + 1}`}
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
                    </div>
                </div>
            )}
        </>
    );
}
