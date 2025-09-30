import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import moment from "moment";
import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";
import TextArea from "@/app/_components/textarea";
import { department } from "@/app/lib/search-lib";

export default function CreateButtonSection() {
    const [open, setOpen] = useState(false);
    const amountInputRef = useRef(null);

    const generateRequestNo = () => {
        return "VR-" + moment().format("MMDDYY-HHmmss");
    };

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            vr_no: "",
            department: "",
            requestor: "",
            purpose: "",
            date: "",
            amount: "",
            priority: "",
            status: "Pending",
        },
    });

    useEffect(() => {
        if (open) {
            setValue("vr_no", generateRequestNo());
        }
    }, [open, setValue]);

    useEffect(() => {
        const amountInput = amountInputRef.current;
        if (amountInput) {
            const handleWheel = (e) => {
                e.target.blur();
                // or use e.preventDefault() to just prevent the scroll
            };

            amountInput.addEventListener("wheel", handleWheel, {
                passive: false,
            });

            return () => {
                amountInput.removeEventListener("wheel", handleWheel);
            };
        }
    }, [open]);

    const department_data = [
        { value: "IT", label: "IT" },
        { value: "HR", label: "Human Resources" },
        { value: "Accounting", label: "Accounting" },
    ];

    const category_data = [
        { value: "Software Subscription", label: "Software Subscription" },
        { value: "Repair and Maintenance", label: "Repair and Maintenance" },
        { value: "Office Supplies", label: "Office Supplies" },
        { value: "Meals", label: "Meals" },
        { value: "Transportation", label: "Transportation" },
    ];

    const priority_data = [
        { value: "high", label: "High" },
        { value: "medium", label: "Medium" },
        { value: "low", label: "Low" },
    ];

    const onSubmit = async (data) => {
        try {
            console.log("Creating voucher request:", data);

            // Add your API call here
            // await createVoucherRequest(data)

            // Convert amount to number
            data.amount = parseFloat(data.amount);

            console.log("Voucher request created successfully:", data);

            // Reset form and close modal
            reset();
            setOpen(false);

            // You might want to refresh the voucher request list here
            // dispatch(getVoucherRequestsThunk())
        } catch (error) {
            console.error("Error creating voucher request:", error);
        }
    };

    const handleModalClose = () => {
        setOpen(false);
        reset();
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Create Voucher</Button>

            <Modal
                width="max-w-lg"
                isOpen={open}
                onClose={handleModalClose}
                title="Create Voucher Request"
            >
                <form
                    className="h-auto flex flex-col w-full gap-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="space-y-4">
                        <Input
                            label="VR No."
                            placeholder="Auto-generated"
                            error={errors?.vr_no?.message}
                            register={register("vr_no")}
                            readOnly
                        />
                        <Select
                            label="Department"
                            name="department"
                            options={department_data}
                            error={errors?.department?.message}
                            register={register("department", {
                                required: "This field is required",
                            })}
                            onChange={(e) => select_department(e.target.value)}
                        />
                        <Select
                            label="Category"
                            name="category"
                            options={category_data}
                            error={errors?.category?.message}
                            register={register("category", {
                                required: "This field is required",
                            })}
                            onChange={(e) => select_category(e.target.value)}
                        />

                        <Input
                            ref={amountInputRef}
                            label="Amount"
                            type="number"
                            step="0.01"
                            placeholder="Enter amount"
                            error={errors?.amount?.message}
                            register={register("amount", {
                                required: "Amount is required",
                                min: {
                                    value: 0.01,
                                    message: "Amount must be greater than 0",
                                },
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

                        <TextArea
                            label="Description/Purpose"
                            error={errors?.purpose?.message}
                            register={register("purpose", {
                                required: "This field is required",
                            })}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleModalClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="primary"
                            loading={isSubmitting}
                        >
                            Create Voucher
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
