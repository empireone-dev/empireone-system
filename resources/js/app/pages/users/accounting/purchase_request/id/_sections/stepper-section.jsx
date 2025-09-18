import { CheckIcon } from "@heroicons/react/20/solid";
import moment from "moment";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function StepperSection() {
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
            name: "Preparation For Purchase Order",
            description: "Accounting Will Create The Purchase Order.",
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
            name: "Budget Released",
            description: "Iusto et officia maiores porro ad non quas.",
            href: "#",
            status: "complete",
        },
        {
            name: "Buying Request Purchased Items",
            description: "Iusto et officia maiores porro ad non quas.",
            href: "#",
            status: "complete",
        },
          {
            name: "Uploaded Invoice",
            description: "Iusto et officia maiores porro ad non quas.",
            href: "#",
            status: "complete",
        },
         {
            name: "Received Items",
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
                {steps.map((step, stepIdx) => (
                    <li
                        key={step.name}
                        className={classNames(
                            stepIdx !== steps.length - 1 ? "pb-10" : "",
                            "relative"
                        )}
                    >
                        {step.status === "complete" ? (
                            <>
                                {stepIdx !== steps.length - 1 ? (
                                    <div
                                        aria-hidden="true"
                                        className="absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5 bg-blue-600 "
                                    />
                                ) : null}
                                <a
                                    href={step.href}
                                    className="group relative flex items-start"
                                >
                                    <span className="flex h-9 items-center">
                                        <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-blue-600 group-hover:bg-blue-800  ">
                                            <CheckIcon
                                                aria-hidden="true"
                                                className="size-5 text-white"
                                            />
                                        </span>
                                    </span>
                                    <span className="ml-4 flex min-w-0 flex-col">
                                        <span className="text-sm font-medium text-gray-900 ">
                                            {step.name}
                                        </span>
                                        <span className="text-sm text-gray-500 ">
                                            {step.description}
                                        </span>
                                    </span>
                                </a>
                            </>
                        ) : step.status === "current" ? (
                            <>
                                {stepIdx !== steps.length - 1 ? (
                                    <div
                                        aria-hidden="true"
                                        className="absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5 bg-gray-300 "
                                    />
                                ) : null}
                                <a
                                    href={step.href}
                                    aria-current="step"
                                    className="group relative flex items-start"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="flex h-9 items-center"
                                    >
                                        <span className="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-blue-600 bg-white ">
                                            <span className="size-2.5 rounded-full bg-blue-600 " />
                                        </span>
                                    </span>
                                    <span className="ml-4 flex min-w-0 flex-col">
                                        <span className="text-sm font-medium text-blue-600">
                                            {step.name}
                                        </span>
                                        <span className="text-sm text-gray-500 ">
                                            {step.description}
                                        </span>
                                    </span>
                                </a>
                            </>
                        ) : (
                            <>
                                {stepIdx !== steps.length - 1 ? (
                                    <div
                                        aria-hidden="true"
                                        className="absolute top-4 left-4 mt-0.5 -ml-px h-full w-0.5 bg-gray-300 "
                                    />
                                ) : null}
                                <a
                                    href={step.href}
                                    className="group relative flex items-start"
                                >
                                    <span
                                        aria-hidden="true"
                                        className="flex h-9 items-center"
                                    >
                                        <span className="relative z-10 flex size-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white group-hover:border-gray-400 ">
                                            <span className="size-2.5 rounded-full bg-transparent group-hover:bg-gray-300 dark:group-hover:bg-white/15" />
                                        </span>
                                    </span>
                                    <span className="ml-4 flex min-w-0 flex-col">
                                        <span className="text-sm font-medium text-gray-500 ">
                                            {step.name}
                                        </span>
                                        <span className="text-sm text-gray-500 ">
                                            {step.description}
                                        </span>
                                    </span>
                                </a>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
}
