import { useState } from "react";
import { useSelector } from "react-redux";
import {
    CheckCircleIcon,
    XCircleIcon,
    DocumentArrowUpIcon,
    CalendarIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";
import ValidateIRModal from "./validate-ir";
import InvalidateIRModal from "./invalidate-ir";
import EmployeeResponseModal from "./create-employee-response";
import ScheduleHearingModal from "./schedule-hearing";
import UploadNODModal from "./upload-nod";

export default function HRActionsSection() {
    const { ir } = useSelector((store) => store.hr);
    const [showValidateModal, setShowValidateModal] = useState(false);
    const [showInvalidateModal, setShowInvalidateModal] = useState(false);

    const [showHearingModal, setShowHearingModal] = useState(false);
    const [showNODModal, setShowNODModal] = useState(false);

    const canValidate =
        ir?.status === "Pending HR Validation" || ir?.status === "IR Submitted";
    const canUploadResponse =
        ir?.status === "Valid — NTE Served" ||
        ir?.status === "Awaiting Employee Response";
    const canScheduleHearing = ir?.status === "Employee Response Submitted";
    const canUploadNOD =
        ir?.status === "Employee Response Submitted" ||
        ir?.status === "Hearing Scheduled";
    const isClosed =
        ir?.status === "Closed" || ir?.status === "Invalid – Closed";

    if (isClosed) {
        return (
            <div className="bg-gray-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">
                    This case is closed. No further actions available.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                    HR Actions
                </h3>

                <div className="grid grid-cols-1 gap-3">
                    {canValidate && (
                        <>
                            <button
                                onClick={() => setShowValidateModal(true)}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                <CheckCircleIcon className="w-5 h-5" />
                                Validate IR & Serve NTE
                            </button>
                            <button
                                onClick={() => setShowInvalidateModal(true)}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            >
                                <XCircleIcon className="w-5 h-5" />
                                Mark as Invalid
                            </button>
                        </>
                    )}

                    {canUploadResponse && (
                        <EmployeeResponseModal irId={ir?.id} />
                    )}

                    {canScheduleHearing && (
                        <button
                            onClick={() => setShowHearingModal(true)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        >
                            <CalendarIcon className="w-5 h-5" />
                            Schedule Hearing
                        </button>
                    )}

                    {canUploadNOD && (
                        <button
                            onClick={() => setShowNODModal(true)}
                            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            <DocumentTextIcon className="w-5 h-5" />
                            Upload NOD & Close Case
                        </button>
                    )}
                </div>
            </div>

            {/* Modals */}
            <div className="">
                <ValidateIRModal
                    isOpen={showValidateModal}
                    onClose={() => setShowValidateModal(false)}
                    irId={ir?.id}
                    ir={ir}
                />
                <InvalidateIRModal
                    isOpen={showInvalidateModal}
                    onClose={() => setShowInvalidateModal(false)}
                    irId={ir?.id}
                />
            </div>

            <ScheduleHearingModal
                isOpen={showHearingModal}
                onClose={() => setShowHearingModal(false)}
                irId={ir?.id}
            />
            <UploadNODModal
                isOpen={showNODModal}
                onClose={() => setShowNODModal(false)}
                irId={ir?.id}
            />
        </>
    );
}
