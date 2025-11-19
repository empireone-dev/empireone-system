import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import SwalAlert from "@/app/_components/swal";
import { setEmployee } from "@/app/redux/account-slice";
import {
    get_employee_by_employee_id_service,
    send_otp_service,
} from "@/app/services/accounts-service";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function FormSection({ setCurrentStep }) {
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await get_employee_by_employee_id_service(id);

            if (response.data.data) {
                const res = await send_otp_service(response.data.data.eogs);

                dispatch(setEmployee(response.data.data));
                await SwalAlert({
                    icon: "success",
                    title: "Successfully Verified Employee ID",
                    type: "success",
                });
                setCurrentStep(3);
            } else {
                await SwalAlert({
                    icon: "error",
                    title: "Employee ID not found. Please check and try again.",
                    type: "error",
                });
            }
            setLoading(false);
            console.log("Employee Data:", response.data.data);
        } catch (error) {
            await SwalAlert({
                icon: "error",
                title:
                    error.response.data.message ||
                    "Failed to fetch employee data.",
                type: "error",
            });
            setLoading(false);
            console.error("Error fetching employee data:", error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col w-96 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
                <h2 className="text-lg font-semibold">Employee ID</h2>
                <p className="mt-2 mb-5 text-gray-600 dark:text-gray-300">
                    Please enter your unique Employee ID assigned by the
                    company. This ID is required to verify your identity and
                    link your information to your employee profile. Ensure that
                    the ID is entered correctly to avoid delays in processing
                    your onboarding.
                </p>
                <Input
                    onChange={(e) => setId(e.target.value)}
                    label="Employee ID"
                    type="number"
                    required
                    name="employee_id"
                />
                <Button loading={loading} type="submit">
                    SUBMIT
                </Button>
            </div>
        </form>
    );
}
