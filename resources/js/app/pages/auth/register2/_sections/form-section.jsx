import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";
import SwalAlert from "@/app/_components/swal";
import { create_accounts_service } from "@/app/services/accounts-service";
import { router } from "@inertiajs/react";
import React from "react";
import { useForm } from "react-hook-form";

export default function FormSection({ setCurrentStep }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            department: "Employee",
        },
    });

    async function submit_data(data) {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value ?? "");
        });

        try {
            await create_accounts_service(formData);
            await SwalAlert({
                icon: "success",
                title: "Account successfully created",
                type: "success",
            });
            reset();
            setCurrentStep?.(3);
        } catch (error) {
            await SwalAlert({
                icon: "error",
                title:
                    error.response?.data?.message ||
                    "Failed to create account.",
                type: "error",
            });
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-full mt-20">
            <img
                alt="Your Company"
                src="/images/E1CXlogo.png"
                className="h-16 w-auto"
            />
            <form onSubmit={handleSubmit(submit_data)}>
                <div className="relative flex flex-col w-[650px] p-6 bg-white rounded-xl shadow-xl border border-gray-100">
                    {/* Close Button / Header Icon */}
                    <button
                        type="button"
                        className="absolute top-5 right-5 text-red-500 hover:text-red-700 text-xl font-bold focus:outline-none"
                        onClick={() => {
                            router.visit("/");
                        }}
                    >
                        &times;
                    </button>
                    <div className="flex justify-center">
                        <h2 className="text-2xl font-bold text-gray-800">
                            TICKETING SYSTEM
                        </h2>
                    </div>
                    <hr className=" w-full border-gray-200" />
                    <h2 className="flex justify-start text-left text-lg font-bold text-gray-800 mt-6">
                        Create a New Account
                    </h2>

                    {/* Floating Label Input container styled like the screenshot */}
                    <div className="relative w-full flex flex-col gap-5">
                        <Input type="hidden" name="department" />
                        <Select
                            label="Location"
                            name="location"
                            options={[
                                {
                                    label: "San Carlos",
                                    value: "San Carlos",
                                },
                                {
                                    label: "Carcar",
                                    value: "Carcar",
                                },
                                {
                                    label: "Urdaneta",
                                    value: "Urdaneta",
                                },
                            ]}
                            error={errors?.location?.message}
                            register={register("location", {
                                required: "This field is required",
                            })}
                        />
                        <Input
                            label="Fullname"
                            type="text"
                            name="name"
                            error={errors?.name?.message}
                            register={register("name", {
                                required: "This field is required",
                            })}
                        />
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            error={errors?.email?.message}
                            register={register("email", {
                                required: "This field is required",
                            })}
                        />
                        <Input
                            label="Position"
                            type="text"
                            name="position"
                            error={errors?.position?.message}
                            register={register("position", {
                                required: "This field is required",
                            })}
                        />
                    </div>

                    <Button
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full py-3 mt-5 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg shadow-md transition-colors"
                    >
                        SUBMIT
                    </Button>
                </div>
            </form>
        </div>
    );
}
