import { CheckIcon } from "@heroicons/react/20/solid";
import { XMarkIcon, ClockIcon } from "@heroicons/react/24/outline";
import { FileIcon } from "lucide-react";
import moment from "moment";
import { useSelector } from "react-redux";
import ShowMoreNotesSection from "./show-more-notes-section";
// import EmployeeResponseInline from "./EmployeeResponseInline"; // Add this

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function StepperSection() {
    const { ir } = useSelector((store) => store.hr);

    // Full workflow stages matching HR requirements
    const workflowStages = [
        { key: "IR Submitted", label: "IR Submitted" },
        { key: "HR Validation", label: "HR Validation" },
        { key: "NTE Served", label: "NTE Served" },
        { key: "Employee Response", label: "Employee Response" },
        { key: "Review / Hearing", label: "Review / Hearing (If Grave)" },
        { key: "NOD Issued", label: "NOD Issued / Closed" },
    ];

    // Build logs with proper initial status
    const logs =
        ir?.logs?.length > 0
            ? ir.logs
            : [
                  {
                      status: "IR Submitted",
                      created_at: ir?.created_at || new Date(),
                      notes: "Incident report has been filed",
                      files: null,
                      user: ir?.filed_by?.name || "System",
                  },
              ];

    // Helper to determine step status color
    const getStepColor = (status) => {
        const invalidStatuses = ["Invalid – Closed", "Declined"];
        const pendingStatuses = [
            "Pending HR Validation",
            "Awaiting Employee Response",
        ];

        if (invalidStatuses.includes(status)) {
            return "bg-red-600 group-hover:bg-red-800";
        } else if (pendingStatuses.includes(status)) {
            return "bg-yellow-600 group-hover:bg-yellow-800";
        } else if (status === "Closed" || status === "NOD Issued") {
            return "bg-green-600 group-hover:bg-green-800";
        }
        return "bg-blue-600 group-hover:bg-blue-800";
    };

    // Helper to determine icon
    const getStepIcon = (status) => {
        const invalidStatuses = ["Invalid – Closed", "Declined"];
        const pendingStatuses = [
            "Pending HR Validation",
            "Awaiting Employee Response",
        ];

        if (invalidStatuses.includes(status)) {
            return (
                <XMarkIcon aria-hidden="true" className="size-5 text-white" />
            );
        } else if (pendingStatuses.includes(status)) {
            return (
                <ClockIcon aria-hidden="true" className="size-5 text-white" />
            );
        }
        return <CheckIcon aria-hidden="true" className="size-5 text-white" />;
    };

    return (
        <div className="space-y-6">
            {/* Current Status Badge */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Current Status
                </h3>
                <span
                    className={classNames(
                        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium",
                        ir?.status === "Invalid – Closed" ||
                            ir?.status === "Declined"
                            ? "bg-red-100 text-red-800"
                            : ir?.status === "Closed" ||
                              ir?.status === "NOD Issued"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                    )}
                >
                    {ir?.status || "Pending HR Validation"}
                </span>
            </div>

            {/* Progress Timeline */}
            <nav aria-label="Progress">
                <h3 className="text-sm font-medium text-gray-700 mb-4">
                    Workflow Progress
                </h3>
                <ol role="list" className="overflow-hidden">
                    {logs?.map((step, i) => (
                        <li
                            key={i}
                            className={classNames(
                                i !== logs.length - 1 ? "pb-8" : "",
                                "relative"
                            )}
                        >
                            {i !== logs.length - 1 && (
                                <div
                                    aria-hidden="true"
                                    className="absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5 bg-gray-300"
                                />
                            )}
                            <div className="group relative flex items-start">
                                <span className="flex h-9 items-center">
                                    <span
                                        className={`${getStepColor(
                                            step.status
                                        )} relative z-10 flex size-8 items-center justify-center rounded-full`}
                                    >
                                        {getStepIcon(step.status)}
                                    </span>
                                </span>
                                <span className="ml-4 flex min-w-0 flex-col">
                                    <span className="text-sm font-medium text-gray-900">
                                        {step.status}
                                    </span>
                                    <span className="text-sm text-gray-500">
                                        {moment(step.created_at).format("LLL")}
                                    </span>
                                    {step.user && (
                                        <span className="text-xs text-gray-400">
                                            By: {step.user}
                                        </span>
                                    )}
                                    <div className="flex flex-col gap-1 mt-2">
                                        {step.notes && (
                                            <span className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                                                <ShowMoreNotesSection
                                                    data={step.notes}
                                                />
                                            </span>
                                        )}
                                        {/* Add this: Show explanation text inline for Employee Response */}
                                        {/* {step.status === "Employee Response Submitted" &&
                                            step.files && (
                                                <EmployeeResponseInline
                                                    filesUrl={step.files}
                                                    irId={ir.id}
                                                    logId={step.id}
                                                />
                                            )} */}
                                        {step.files &&
                                            step.status !==
                                                "Employee Response Submitted" && (
                                                <a
                                                    href={step.files}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                                                >
                                                    <FileIcon className="inline size-4" />
                                                    View attachment
                                                </a>
                                            )}
                                    </div>
                                </span>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
}
