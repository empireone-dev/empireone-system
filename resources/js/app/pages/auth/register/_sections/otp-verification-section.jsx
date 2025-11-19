import SwalAlert from "@/app/_components/swal";
import { verify_otp_service } from "@/app/services/accounts-service";
import { router } from "@inertiajs/react";
import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function OTPVerificationSection({ onSubmit }) {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputsRef = useRef([]);
    const { employee } = useSelector((state) => state.accounts);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (loading) {
            Swal.fire({
                title: "Please wait...",
                text: "Loading data",
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });
        }
    }, [loading]);
    const handleChange = async (element, index) => {
        const value = element.value.replace(/\D/, ""); // only numbers
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Focus next input
        if (index < 5) {
            inputsRef.current[index + 1].focus();
        }

        // Auto-submit if all 6 digits are filled
        if (newOtp.every((digit) => digit !== "")) {
            const otpValue = newOtp.join("");
            setLoading(true);
            try {
                await verify_otp_service({
                    ...employee,
                    email: employee.eogs,
                    otp: otpValue,
                });
                await SwalAlert({
                    icon: "success",
                    title: "Successfully Verified OTP",
                    type: "success",
                });
                router.visit("/");
                setLoading(false);
            } catch (error) {
                setLoading(false);
                await SwalAlert({
                    icon: "error",
                    title: "Failed to Verify OTP",
                    type: "error",
                });
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace") {
            if (otp[index]) {
                // Clear current input
                const newOtp = [...otp];
                newOtp[index] = "";
                setOtp(newOtp);
            } else if (index > 0) {
                // Move to previous input
                inputsRef.current[index - 1].focus();
            }
        }
    };

    return (
        <div className="p-4 bg-gray-50  rounded-md max-w-md mx-auto">
            <h2 className="text-lg font-semibold">Email OTP Verification</h2>
            <p className="mt-2 text-gray-600 ">
                Enter the 6-digit OTP sent to your email.
            </p>
            {loading && <div>Loading...</div>}
            <div className="flex justify-between mt-4 space-x-2">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        ref={(el) => (inputsRef.current[index] = el)}
                        onChange={(e) => handleChange(e.target, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        className="w-12 h-12 text-center border rounded-md focus:outline-none focus:ring focus:ring-indigo-500 text-lg font-medium  "
                    />
                ))}
            </div>
        </div>
    );
}
