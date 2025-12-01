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
import ShowFileSection from "./show-file-section";

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
                                {/* <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                                    <div className="font-medium text-gray-900">
                                        Manager/TL Name:
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {ir?.manager_tl_name ?? "N/A"}
                                    </div>
                                </div> */}

                                <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                                    <div className="font-medium text-gray-900">
                                        Violator:
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {ir?.violator ?? "N/A"}
                                    </div>
                                </div>
                                {/* <div className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100">
                                    <div className="font-medium text-gray-900">
                                        Violator Email:
                                    </div>
                                    <div className="col-span-2 text-gray-700">
                                        {ir?.email ?? "N/A"}
                                    </div>
                                </div> */}

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
            <ShowFileSection
                data={ir}
                isOpen={showFilesModal}
                onClose={() => setShowFilesModal(false)}
            />
        </>
    );
}
