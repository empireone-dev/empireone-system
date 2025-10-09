import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import Select from "@/app/_components/select";
import SwalAlert from "@/app/_components/swal";
import { accounting_categories } from "@/app/lib/accounting-category";
import { get_accounting_expenses_thunk } from "@/app/redux/accounting-thunk";
import { request_change_status_service } from "@/app/services/accounting-expenses-service";
import store from "@/app/store/store";
import { DatePicker, Image } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FcCancel, FcCheckmark } from "react-icons/fc";

export default function DeclinedSection({ data }) {
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            description: "",
            receipt_number: "",
            amount: "",
            balance: "",
            files: [],
            date: dayjs(), // single date (can change to array for range)
        },
    });

    useEffect(() => {
        setValue("receipt_number", data.receipt_number);
        setValue("description", data.description);
        setValue("date", dayjs(data.date));
        setValue("amount", data.amount);
    }, [open]);

    async function submit_data(params) {
        await request_change_status_service({
            ...params,
            id: data.id,
            status: "Declined",
        });
        await store.dispatch(
            get_accounting_expenses_thunk({ status: "Pending" })
        );
        await SwalAlert({ type: "success" });
        reset();
        setOpen(false);
    }

    return (
        <div>
            <button onClick={() => setOpen(true)}>
                <FcCancel className="h-8 w-8" />
            </button>
            <Modal
                width="max-w-lg"
                title="Decline Request"
                isOpen={open}
                onClose={setOpen}
            >
                <form
                    onSubmit={handleSubmit(submit_data)}
                    className="flex flex-col gap-4"
                >
                    <Image width="100%" height={150} src={data.files} />
                    <Controller
                        control={control}
                        name="date"
                        rules={{
                            required: "Please select a date",
                        }}
                        render={({ field }) => (
                            <DatePicker
                                size="large"
                                className="w-full border py-2.5 border-gray-900"
                                onChange={field.onChange}
                                value={field.value}
                                disabledDate={(current) =>
                                    current && current < dayjs().startOf("day")
                                }
                            />
                        )}
                    />
                    {errors?.date && (
                        <p className="text-sm text-red-600 mt-1">
                            {errors.date.message}
                        </p>
                    )}

                    <Input
                        label="Description"
                        type="text"
                        name="description"
                        error={errors?.description?.message}
                        register={register("description", {
                            required: "This field is required",
                        })}
                    />

                    <Input
                        label="Receipt Number"
                        type="text"
                        name="receipt_number"
                        error={errors?.receipt_number?.message}
                        register={register("receipt_number", {
                            required: "This field is required",
                        })}
                    />

                    <Input
                        label="Amount"
                        type="number"
                        name="amount"
                        error={errors?.amount?.message}
                        register={register("amount", {
                            required: "This field is required",
                        })}
                    />

                    <Select
                        label="Category"
                        name="category"
                        options={accounting_categories}
                        error={errors?.category?.message}
                        register={register("category", {
                            required: "This field is required",
                        })}
                    />
                    <Button
                        type="submit"
                        className="bg-red-600 text-white hover:bg-red-700"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        DECLINED
                    </Button>
                </form>
            </Modal>
        </div>
    );
}
