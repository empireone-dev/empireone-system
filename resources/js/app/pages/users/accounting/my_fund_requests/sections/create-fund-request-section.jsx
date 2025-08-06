import React, { useEffect, useState } from "react";
import { DatePicker, Spin, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import moment from "moment";
import { scan_receipt_service } from "@/app/services/open-ai-service";
import SwalAlert from "@/app/_components/swal";

import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import { accounting_expenses_service } from "@/app/services/accounting-expenses-service";

const { Dragger } = Upload;

export default function CreateFundRequestSection() {
    const [open, setOpen] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);
    const [loading, setLoading] = useState(false);
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

    async function submit_data(data) {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (key === "files" && value?.length) {
                const file = value[0];
                formData.append("file", file.originFileObj);
            } else if (key === "date") {
                formData.append(
                    "date",
                    moment(value.toISOString()).format("LLL")
                );
            } else {
                formData.append(key, value ?? "");
            }
        });

        try {
            await accounting_expenses_service(formData);
            setIsUploaded(false);
            await SwalAlert({ type: "success" });
            reset();
            setOpen(false);
        } catch (err) {
            setIsUploaded(false);
            console.error("Submit error:", err);
        }
    }

    async function scan_receipt(info, field) {
        setLoading(true);
        const latestFile = info.fileList.slice(-1);
        const fd = new FormData();
        const file = latestFile[0]?.originFileObj;

        if (!file) return;

        fd.append("receipt", file);

        try {
            const res = await scan_receipt_service(fd);
            const { receipt_number, amount, date, description } =
                res.data.result;

            // Populate fields from scan
            if (receipt_number) setValue("receipt_number", receipt_number);
            if (amount) setValue("amount", amount);
            if (description) setValue("description", description);
            if (date) {
                const parsedDate = dayjs(date, ["MM/DD/YYYY", "YYYY-MM-DD"]);
                if (parsedDate.isValid()) {
                    setValue("date", parsedDate);
                }
            }

            field.onChange(latestFile);
            setIsUploaded(true);
            setLoading(false);
        } catch (err) {
            setIsUploaded(true);
            setLoading(false);
            console.error("Scan error:", err);
        }
    }

    useEffect(() => {
        if (open) {
            setIsUploaded(false);
        }
    }, [open]);
    return (
        <>
            <Button onClick={() => setOpen(true)}>Create Fund Request</Button>

            <Modal
                width="max-w-xl"
                isOpen={open}
                onClose={setOpen}
                title="Create Fund Request"
            >
                <form
                    onSubmit={handleSubmit(submit_data)}
                    className="flex flex-col gap-4"
                >
                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-4">
                            {!loading && isUploaded && (
                                <div className="flex flex-col gap-4">
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
                                                    current &&
                                                    current <
                                                        dayjs().startOf("day")
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
                                </div>
                            )}

                            <div className="overflow-auto">
                                <Spin spinning={loading} tip="Scanning...">
                                    <Controller
                                        name="files"
                                        control={control}
                                        defaultValue={[]}
                                        rules={{
                                            validate: (files) =>
                                                !files ||
                                                files.length <= 1 ||
                                                "Only one file allowed",
                                        }}
                                        render={({ field }) => (
                                            <Dragger
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                height={150}
                                                beforeUpload={() => false}
                                                multiple={false}
                                                onChange={(info) => {
                                                    const latest =
                                                        info.fileList.slice(-1);
                                                    setLoading(true);
                                                    scan_receipt(
                                                        {
                                                            ...info,
                                                            fileList: latest,
                                                        },
                                                        field
                                                    ).finally(() => {
                                                        setLoading(false);
                                                    });
                                                }}
                                                fileList={field.value || []}
                                            >
                                                <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p>
                                                <p className="ant-upload-text">
                                                    Click or drag receipt to
                                                    this area to upload
                                                </p>
                                            </Dragger>
                                        )}
                                    />
                                    {errors?.files && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.files.message}
                                        </p>
                                    )}
                                </Spin>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        loading={isSubmitting || loading}
                        disabled={isSubmitting || loading}
                    >
                        SUBMIT REFUND
                    </Button>
                </form>
            </Modal>
        </>
    );
}
