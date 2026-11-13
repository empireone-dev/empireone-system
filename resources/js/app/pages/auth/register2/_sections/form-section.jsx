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
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 px-4 py-12 sm:px-6 lg:px-8">
            {/* Top Logo and Title */}
            <div className="mb-8 flex flex-col items-center text-center">
                <div className="inline-flex flex-col items-center ">
                    <img
                        alt="EmpireOneCX"
                        src="/images/E1CXlogo.png"
                        className="h-14 w-auto object-contain"
                    />
                    <span className="mt-2 text-xs font-semibold tracking-wider text-blue-300 uppercase">
                        Unified Ticketing System
                    </span>
                </div>
            </div>

            {/* Form Card */}
            <div className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.4)] sm:p-10">
                {/* Close Button */}
                <button
                    type="button"
                    className="absolute top-6 right-6 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none"
                    onClick={() => {
                        router.visit("/");
                    }}
                    title="Close"
                >
                    ×
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                        Create a New Account
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Fill in the details below to provision a new user account.
                    </p>
                </div>

                <hr className="mb-6 border-slate-100" />

                <form onSubmit={handleSubmit(submit_data)} className="space-y-5">
                    <Input type="hidden" name="department" />

                    <Select
                        label="Location"
                        name="location"
                        options={[
                            { label: "San Carlos", value: "San Carlos" },
                            { label: "Carcar", value: "Carcar" },
                            { label: "Urdaneta", value: "Urdaneta" },
                        ]}
                        error={errors?.location?.message}
                        register={register("location", {
                            required: "This field is required",
                        })}
                    />

                    <Input
                        label="Full Name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        error={errors?.name?.message}
                        register={register("name", {
                            required: "This field is required",
                        })}
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        name="email"
                        placeholder="name@company.com"
                        error={errors?.email?.message}
                        register={register("email", {
                            required: "This field is required",
                        })}
                    />

                    <Input
                        label="Position"
                        type="text"
                        name="position"
                        placeholder="e.g. Support Specialist"
                        error={errors?.position?.message}
                        register={register("position", {
                            required: "This field is required",
                        })}
                    />

                    <div className="pt-2">
                        <Button
                            loading={isSubmitting}
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3 text-sm font-semibold tracking-wider text-white shadow-lg shadow-blue-600/30 transition-all hover:from-blue-500 hover:to-cyan-500"
                        >
                            CREATE ACCOUNT
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}