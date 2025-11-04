import { CheckIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { FileIcon } from "lucide-react";
import moment from "moment";
import { useSelector } from "react-redux";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function StepperSection() {
    const { ir } = useSelector((store) => store.hr);
    console.log("ir", ir?.logs);
    const steps = [
        {
            name: "Created Incident Report",
            description: "Created on " + moment().format("LLL"),
            href: "#",
            status: "complete",
        },
        {
            name: "Pending Incident Report",
            description: "Waiting For HR Review.",
            href: "#",
            status: "complete",
        },

        {
            name: "Valid Incident Report",
            description: "HR will send NTE to the employee email.",
            href: "#",
            status: "complete",
        },
        {
            name: "Employee Response",
            description: "Waiting for employee response.",
            href: "#",
            status: "complete",
        },
        {
            name: "Employee Responded",
            description: "Employee has responded to the NTE.",
            href: "#",
            status: "complete",
        },
        {
            name: "Status pending",
            description: "Waiting for management decision.",
            href: "#",
            status: "complete",
        },
        {
            name: "Completed",
            description: "Iusto et officia maiores porro ad non quas.",
            href: "#",
            status: "upcoming",
        },
    ];
    return (
        <nav aria-label="Progress">
            <ol role="list" className="overflow-hidden">
                {ir?.logs?.map((step, i) => (
                    <li
                        key={i}
                        className={classNames(
                            i !== steps.length - 1 ? "pb-8" : "",
                            "relative"
                        )}
                    >
                        {i !== ir.logs.length - 1 && (
                            <div
                                aria-hidden="true"
                                className="absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5 bg-gray-300"
                            />
                        )}
                        <a
                            href={step.href}
                            className="group relative flex items-start"
                        >
                            <span className="flex h-9 items-center">
                                <span
                                    className={`${
                                        step.status == "Declined"
                                            ? "bg-red-600  group-hover:bg-red-800"
                                            : "bg-blue-600  group-hover:bg-blue-800"
                                    } relative z-10 flex size-8 items-center justify-center rounded-full `}
                                >
                                    {step.status === "Declined" ? (
                                        <XMarkIcon
                                            aria-hidden="true"
                                            className="size-5 text-white"
                                        />
                                    ) : (
                                        <CheckIcon
                                            aria-hidden="true"
                                            className="size-5 text-white"
                                        />
                                    )}
                                </span>
                            </span>
                            <span className="ml-4 flex min-w-0 flex-col">
                                <span className="text-sm font-medium text-gray-900 ">
                                    {step.status}
                                </span>
                                <span className="text-sm text-gray-500 ">
                                    {moment(step.created_at).format("LLL")}
                                </span>
                                <div className="flex ">
                                    {step.files && (
                                        <a
                                            href={step.files}
                                            target="_blank"
                                            className="text-sm text-blue-500 "
                                        >
                                            <FileIcon className="inline size-8 mr-1" />
                                        </a>
                                    )}
                                    {step.notes && (
                                        <span className="text-sm text-black ">
                                            {step.notes ?? ""}
                                        </span>
                                    )}
                                </div>
                            </span>
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
