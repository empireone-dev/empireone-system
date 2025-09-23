import { CheckIcon } from "@heroicons/react/20/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";
import moment from "moment";
import { useSelector } from "react-redux";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function StepperSection() {
    const { purchase_request } = useSelector((store) => store.accounting);
    console.log("purchase_request", purchase_request?.logs);
    const steps = [
        {
            name: "Created Purchase Request",
            description: "Created on " + moment().format("LLL"),
            href: "#",
            status: "complete",
        },
        {
            name: "Pending Purchase Request",
            description: "Waiting For Manager Approval.",
            href: "#",
            status: "complete",
        },

        {
            name: "Pending Admin Approval",
            description: "Waiting For Admin Approval.",
            href: "#",
            status: "complete",
        },
        {
            name: "Initial Approved",
            description: "Approved by Archie.",
            href: "#",
            status: "complete",
        },
        {
            name: "Second Approved",
            description: "Approved by Cielo",
            href: "#",
            status: "complete",
        },
        {
            name: "Final Approved",
            description: "Final approved by Head of Accounting",
            href: "#",
            status: "complete",
        },
        {
            name: "Release Budget",
            description: "Iusto et officia maiores porro ad non quas.",
            href: "#",
            status: "current",
        },
        {
            name: "Inventory Updated",
            description: "Iusto et officia maiores porro ad non quas.",
            href: "#",
            status: "upcoming",
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
                {purchase_request?.logs?.map((step, i) => (
                    <li
                        key={step.name}
                        className={classNames(
                            i !== steps.length - 1 ? "pb-8" : "",
                            "relative"
                        )}
                    >
                        {i !== purchase_request.logs.length - 1 && (
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
                                {
                                    <span className="text-sm text-red-500 ">
                                        {step.notes ?? ""}
                                    </span>
                                }
                            </span>
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
