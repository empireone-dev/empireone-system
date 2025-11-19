import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import TermsAndConditionSection from "./terms-and-condition-section";
import FormSection from "./form-section";
import OTPVerificationSection from "./otp-verification-section";

const stepsData = [
    { id: "03", name: "Terms & Conditions" },
    { id: "01", name: "Employee ID" },
    { id: "02", name: "Email OTP Verification" },
];

export default function StepperSection() {
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState("next");
    const [agreed, setAgreed] = useState(false); // Terms agreement state

    const StepComponents = [
        ({ onAgreeChange, agreed }) => (
            <TermsAndConditionSection
                onAgreeChange={onAgreeChange}
                agreed={agreed}
            />
        ),
        () => <FormSection setCurrentStep={setCurrentStep} />,
        () => <OTPVerificationSection />,
    ];

    const handleNext = () => {
        if (currentStep < stepsData.length) {
            setDirection("next");
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setDirection("back");
            setCurrentStep(currentStep - 1);
        }
    };

    const CurrentComponent = StepComponents[currentStep - 1];

    return (
        <div className="space-y-6 p-5 h-full">
            {/* Stepper */}
            <nav aria-label="Progress">
                <ol className="divide-y divide-gray-300 rounded-md border border-gray-300 md:flex md:divide-y-0 ">
                    {stepsData.map((step, index) => {
                        let status =
                            index + 1 < currentStep
                                ? "complete"
                                : index + 1 === currentStep
                                ? "current"
                                : "upcoming";

                        return (
                            <li
                                key={step.name}
                                className={`
                  relative md:flex md:flex-1
                  transition-all duration-500 ease-out
                  ${
                      status === "current"
                          ? direction === "next"
                              ? "animate-slideLeftFade"
                              : "animate-slideRightFade"
                          : status === "complete"
                          ? "animate-fadeIn"
                          : ""
                  }
                `}
                            >
                                {status === "complete" ? (
                                    <div className="group flex w-full items-center">
                                        <span className="flex items-center px-6 py-4 text-sm font-medium">
                                            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-indigo-600 transition-all duration-300">
                                                <CheckIcon
                                                    aria-hidden="true"
                                                    className="size-6 text-white"
                                                />
                                            </span>
                                            <span className="ml-4 text-sm font-medium text-gray-900  transition-all duration-300">
                                                {step.name}
                                            </span>
                                        </span>
                                    </div>
                                ) : status === "current" ? (
                                    <div className="flex items-center px-6 py-4 text-sm font-medium">
                                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-indigo-600 transition-all duration-300">
                                            <span className="text-indigo-600">
                                                {step.id}
                                            </span>
                                        </span>
                                        <span className="ml-4 text-sm font-medium text-indigo-600 transition-all duration-300">
                                            {step.name}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="group flex items-center">
                                        <span className="flex items-center px-6 py-4 text-sm font-medium">
                                            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-gray-300 transition-all duration-300 group-hover:border-gray-400">
                                                <span className="text-gray-500 transition-all duration-300 group-hover:text-gray-900">
                                                    {step.id}
                                                </span>
                                            </span>
                                            <span className="ml-4 text-sm font-medium text-gray-500 transition-all duration-300 group-hover:text-gray-900">
                                                {step.name}
                                            </span>
                                        </span>
                                    </div>
                                )}

                                {index !== stepsData.length - 1 && (
                                    <div
                                        aria-hidden="true"
                                        className="absolute top-0 right-0 hidden h-full w-5 md:block"
                                    >
                                        <svg
                                            fill="none"
                                            viewBox="0 0 22 80"
                                            preserveAspectRatio="none"
                                            className="size-full text-gray-300"
                                        >
                                            <path
                                                d="M0 -2L20 40L0 82"
                                                stroke="currentColor"
                                                vectorEffect="non-scaling-stroke"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>

            {/* Step Content */}
            <div className="flex flex-col h-full items-center justify-between">
                <div className={`transition-all duration-500 ease-out`}>
                    <div className="flex items-center justify-center">
                        <CurrentComponent
                            onAgreeChange={setAgreed}
                            agreed={agreed}
                        />
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between w-full">
                    <button
                        onClick={handleBack}
                        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition disabled:opacity-50"
                        disabled={currentStep === 1}
                    >
                        Back
                    </button>
                    {currentStep !== 2 && (
                        <button
                            onClick={handleNext}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
                            disabled={
                                currentStep === stepsData.length ||
                                (currentStep === 1 && !agreed)
                            }
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
