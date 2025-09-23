import React, { useState, useEffect } from "react";
import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";
import Modal from "@/app/_components/modal";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import { create_accounting_purchase_request_service } from "@/app/services/accounting-purchase-request";
import SwalAlert from "@/app/_components/swal";
import moment from "moment";
import store from "@/app/store/store";
import { get_purchase_request_thunk } from "@/app/redux/accounting-thunk";
import TextArea from "@/app/_components/textarea";
import { department_data } from "@/app/lib/department-lib";

export default function CreateButtonSection() {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {
            stock_no: "",
            unit: "",
            description: "",
            quantity: "",
            unit_cost: "",
            total_cost: "",
        },
    ]);
    const [itemErrors, setItemErrors] = useState([]);

    const priority_data = [
        { value: "high", label: "High", color: "text-red-600 bg-red-100" },
        {
            value: "medium",
            label: "Medium",
            color: "text-yellow-600 bg-yellow-100",
        },
        { value: "low", label: "Low", color: "text-green-600 bg-green-100" },
    ];

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            department: "",
            accounting: "",
            priority: "",
            request_no: "",
            date: "",
        },
    });

    const generateRequestNo = () => {
        return "PR-" + moment().format("MMDDYY-HHmmss");
    };

    useEffect(() => {
        if (open) {
            setValue("request_no", generateRequestNo());
            setValue("date", moment().format("YYYY-MM-DD"));
        }
    }, [open, setValue]);

    const handleItemChange = (index, field, value) => {
        const updated = [...items];
        updated[index][field] =
            field === "quantity" || field === "unit_cost"
                ? Number(value)
                : value;
        updated[index].total_cost =
            Number(updated[index].quantity) * Number(updated[index].unit_cost);
        setItems(updated);
    };

    const handleAddItem = () => {
        setItems([
            ...items,
            {
                stock_no: "",
                unit: "",
                description: "",
                quantity: "",
                unit_cost: "",
                total_cost: "",
            },
        ]);
    };

    const handleRemoveItem = (index) => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
    };

    const validateItems = () => {
        const errors = items.map((item) => {
            const err = {};
            if (!item.unit?.trim()) err.unit = "Unit is required";
            if (!item.description?.trim())
                err.description = "Description is required";
            if (!item.quantity || item.quantity <= 0)
                err.quantity = "Quantity must be greater than 0";
            if (!item.unit_cost || item.unit_cost <= 0)
                err.unit_cost = "Unit cost must be greater than 0";
            return err;
        });
        setItemErrors(errors);
        return errors.every((e) => Object.keys(e).length === 0);
    };

    const onSubmit = async (data) => {
        if (!validateItems()) return; // block submission if invalid

        try {
            const payload = { ...data, items };
            await create_accounting_purchase_request_service(payload);
            await store.dispatch(get_purchase_request_thunk());
            await SwalAlert({ type: "success" });

            reset();
            setItems([
                {
                    stock_no: "",
                    unit: "",
                    description: "",
                    quantity: "",
                    unit_cost: "",
                    total_cost: "",
                },
            ]);
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
            <Button type="button" onClick={() => setOpen(true)}>
                Create Purchase Request
            </Button>

            <Modal
                width="max-w-5xl "
                isOpen={open}
                onClose={setOpen}
                title="Create Purchase Request"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
                    <Input
                        label="Purchase Request No."
                        type="text"
                        readOnly
                        error={errors?.request_no?.message}
                        register={register("request_no", {
                            required: "This field is required",
                        })}
                    />

                    <Select
                        label="Department"
                        name="department"
                        options={department_data}
                        error={errors?.department?.message}
                        register={register("department", {
                            required: "This field is required",
                        })}
                    />

                    <Select
                        label="Priority"
                        name="priority"
                        options={priority_data}
                        error={errors?.priority?.message}
                        register={register("priority", {
                            required: "This field is required",
                        })}
                    />

                    <Input
                        label="Date"
                        type="date"
                        error={errors?.date?.message}
                        register={register("date", {
                            required: "This field is required",
                        })}
                    />

                    <TextArea
                        label="Purpose"
                        error={errors?.purpose?.message}
                        register={register("purpose", {
                            required: "This field is required",
                        })}
                    />
                    <div className="text-xl">Items</div>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex gap-2 items-end py-3 border-b"
                        >
                            <div className="flex-1">
                                <Input
                                    label="Unit"
                                    type="text"
                                    name={`items[${index}].unit`}
                                    value={item.unit}
                                    onChange={(e) =>
                                        handleItemChange(
                                            index,
                                            "unit",
                                            e.target.value
                                        )
                                    }
                                />
                                {itemErrors[index]?.unit && (
                                    <p className="text-red-500 text-xs">
                                        {itemErrors[index].unit}
                                    </p>
                                )}
                            </div>

                            <div className="flex-1">
                                <Input
                                    label="Description"
                                    type="text"
                                    name={`items[${index}].description`}
                                    value={item.description}
                                    onChange={(e) =>
                                        handleItemChange(
                                            index,
                                            "description",
                                            e.target.value
                                        )
                                    }
                                />
                                {itemErrors[index]?.description && (
                                    <p className="text-red-500 text-xs">
                                        {itemErrors[index].description}
                                    </p>
                                )}
                            </div>

                            <div className="flex-1">
                                <Input
                                    label="Quantity"
                                    type="number"
                                    name={`items[${index}].quantity`}
                                    value={item.quantity}
                                    onChange={(e) =>
                                        handleItemChange(
                                            index,
                                            "quantity",
                                            e.target.value
                                        )
                                    }
                                    onWheel={(e) => e.currentTarget.blur()}
                                />
                                {itemErrors[index]?.quantity && (
                                    <p className="text-red-500 text-xs">
                                        {itemErrors[index].quantity}
                                    </p>
                                )}
                            </div>

                            <div className="flex-1">
                                <Input
                                    label="Unit Cost"
                                    type="number"
                                    name={`items[${index}].unit_cost`}
                                    value={item.unit_cost}
                                    onChange={(e) =>
                                        handleItemChange(
                                            index,
                                            "unit_cost",
                                            e.target.value
                                        )
                                    }
                                    onWheel={(e) => e.currentTarget.blur()}
                                />
                                {itemErrors[index]?.unit_cost && (
                                    <p className="text-red-500 text-xs">
                                        {itemErrors[index].unit_cost}
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col w-28">
                                <label className="text-sm font-medium">
                                    Total Cost
                                </label>
                                <div className="mt-1 text-gray-900 font-semibold">
                                    ₱ {item.total_cost.toLocaleString()}
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => handleRemoveItem(index)}
                                className="p-2 text-red-500 hover:text-red-700"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    ))}

                    <Button
                        type="button"
                        onClick={handleAddItem}
                        variant="success"
                    >
                        + Add Item
                    </Button>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            onClick={() => setOpen(false)}
                            variant="danger"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" loading={isSubmitting}>
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
