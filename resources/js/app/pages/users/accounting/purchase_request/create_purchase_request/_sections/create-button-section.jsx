import React, { useState } from "react";
import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";
import Modal from "@/app/_components/modal";
import { useForm, useFieldArray } from "react-hook-form";
import { X } from "lucide-react";
import { create_accounting_purchase_request_service } from "@/app/services/accounting-purchase-request";
import SwalAlert from "@/app/_components/swal";

export default function CreateButtonSection() {
    const [open, setOpen] = useState(false);

    const department_data = [
        { value: "finance", label: "Finance" },
        { value: "it", label: "IT" },
        { value: "hr", label: "Human Resources" },
    ];

    const {
        register,
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            department: "",
            accounting: "",
            request_no: "", // ✅ renamed to match backend
            date: "",
            items: [
                {
                    stock_no: "",
                    unit: "",
                    description: "",
                    quantity: "",
                    unit_cost: "",
                    total_cost: "",
                },
            ],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items",
    });

    const items = watch("items");

    const onSubmit = async (data) => {
        try {
            await create_accounting_purchase_request_service(data);
            await SwalAlert({
                            type: "success",
                        });
            reset();
            setOpen(false);
        } catch (error) {
            console.error(
                "Error saving:",
                error.response?.data || error.message
            );
        }
    };
    return (
        <>
            <Button
                type="button"
                onClick={() => setOpen(true)}
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Create Purchase Request
            </Button>

            <Modal
                width="max-w-5xl"
                isOpen={open}
                onClose={setOpen}
                title="Create Purchase Request"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Select
                        label="Department"
                        name="department"
                        options={department_data}
                        error={errors?.department?.message}
                        register={register("department", {
                            required: "This field is required",
                        })}
                    />
                    <Input
                        label="Accounting"
                        type="text"
                        name="accounting"
                        error={errors?.accounting?.message}
                        register={register("accounting", {
                            required: "This field is required",
                        })}
                    />

                    <Input
                        label="Purchase Request No."
                        type="text"
                        name="request_no"
                        error={errors?.request_no?.message}
                        register={register("request_no", {
                            required: "This field is required",
                        })}
                    />

                    <Input
                        label="Date"
                        type="date"
                        name="date"
                        error={errors?.date?.message}
                        register={register("date", {
                            required: "This field is required",
                        })}
                    />

                    <div className="text-xl">Items</div>
                    {fields.map((field, index) => {
                        const quantity = Number(items?.[index]?.quantity || 0);
                        const unitCost = Number(items?.[index]?.unit_cost || 0);
                        const totalCost = quantity * unitCost;

                        // Keep form state updated
                        if (items?.[index]?.total_cost !== totalCost) {
                            setValue(`items.${index}.total_cost`, totalCost);
                        }

                        return (
                            <div
                                key={field.id}
                                className="flex gap-2 items-center py-3"
                            >
                                <Input
                                    label="Unit"
                                    type="text"
                                    name={`items.${index}.unit`}
                                    error={
                                        errors?.items?.[index]?.unit?.message
                                    }
                                    register={register(`items.${index}.unit`, {
                                        required: "This field is required",
                                    })}
                                />
                                <Input
                                    label="Description"
                                    type="text"
                                    name={`items.${index}.description`}
                                    error={
                                        errors?.items?.[index]?.description
                                            ?.message
                                    }
                                    register={register(
                                        `items.${index}.description`,
                                        {
                                            required: "This field is required",
                                        }
                                    )}
                                />
                                <Input
                                    label="Quantity"
                                    type="number"
                                    name={`items.${index}.quantity`}
                                    error={
                                        errors?.items?.[index]?.quantity
                                            ?.message
                                    }
                                    register={register(
                                        `items.${index}.quantity`,
                                        {
                                            required: "This field is required",
                                        }
                                    )}
                                />
                                <Input
                                    label="Unit Cost"
                                    type="number"
                                    name={`items.${index}.unit_cost`}
                                    error={
                                        errors?.items?.[index]?.unit_cost
                                            ?.message
                                    }
                                    register={register(
                                        `items.${index}.unit_cost`,
                                        {
                                            required: "This field is required",
                                        }
                                    )}
                                />
                                <Input
                                    label="Total Cost"
                                    type="number"
                                    name={`items.${index}.total_cost`}
                                    value={totalCost}
                                    readOnly
                                    register={register(
                                        `items.${index}.total_cost`
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="p-2 text-red-500 hover:text-red-700"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        );
                    })}

                    <Button
                        type="button"
                        onClick={() =>
                            append({
                                stock_no: "",
                                unit: "",
                                description: "",
                                quantity: "",
                                unit_cost: "",
                                total_cost: "",
                            })
                        }
                        className="mt-2 rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-500"
                    >
                        + Add Item
                    </Button>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-black hover:bg-gray-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
                            loading={isSubmitting}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
