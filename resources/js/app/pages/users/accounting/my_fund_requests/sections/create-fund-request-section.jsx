import React, { useState } from "react";
import { DatePicker, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import moment from "moment";
import { useSelector } from "react-redux";
import store from "@/app/store/store";
import SwalAlert from "@/app/_components/swal";

import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Input from "@/app/_components/input";
import { scan_receipt_service } from "@/app/services/open-ai-service";

const { Dragger } = Upload;

export default function CreateFundRequestSection() {
    const [open, setOpen] = useState(false);
    const { sites } = useSelector((store) => store.sites);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            description: "",
            receipt_number: "",
            amount: "",
            balance: "",
            files: [],
            date: [dayjs(), dayjs().add(3, "day")],
        },
    });

    async function submit_data(data) {
        const formData = new FormData();
        const [startDate, endDate] = data.date || [];

        Object.entries(data).forEach(([key, value]) => {
            if (key === "date") return;

            if (key === "files" && value?.length) {
                const file = value[0]; // Only the first file
                formData.append("files[0]", file.originFileObj);
            } else {
                formData.append(key, value ?? "");
            }
        });

        formData.append(
            "start",
            startDate ? moment(startDate.toISOString()).format("LLL") : ""
        );
        formData.append(
            "end",
            endDate ? moment(endDate.toISOString()).format("LLL") : ""
        );

        try {
            await SwalAlert({ type: "success" });
            reset();
            setOpen(false);
        } catch (err) {
            console.error("Submit error:", err);
        }
    }

    async function scan_receipt(info, field) {
        const latestFile = info.fileList.slice(-1); // Keep only one
        console.log("Latest file:", latestFile[0]);
        const fd = new FormData();
        fd.append("receipt", latestFile[0].originFileObj);
        await scan_receipt_service(fd);
        field.onChange(latestFile);
    }
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
                            {/* <Controller
                control={control}
                name="date"
                rules={{
                  required: "Please select a date range",
                }}
                render={({ field }) => (
                  <DatePicker.RangePicker
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

              <Input
                label="Balance Amount"
                type="number"
                name="balance"
                error={errors?.balance?.message}
                register={register("balance", {
                  required: "This field is required",
                })}
              /> */}

                            <div className="overflow-auto">
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
                                            onChange={(info) =>
                                                scan_receipt(info, field)
                                            }
                                            fileList={field.value || []}
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">
                                                Click or drag receipt to this
                                                area to upload
                                            </p>
                                        </Dragger>
                                    )}
                                />
                                {errors?.files && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.files.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        SUBMIT REFUND
                    </Button>
                </form>
            </Modal>
        </>
    );
}
