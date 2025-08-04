import React, { useState } from "react";
import { DatePicker, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";

import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Select from "@/app/_components/select";
import Input from "@/app/_components/input";
import Wysiwyg from "@/app/_components/wysiwyg";
import moment from "moment";
import { useSelector } from "react-redux";
import store from "@/app/store/store";
import {
    create_tickets_thunk,
    get_tickets_by_user_thunk,
} from "@/app/redux/ticket-thunk";
import { get_categories_thunk } from "@/app/redux/categories-thunk";
import SwalAlert from "@/app/_components/swal";
import { accounting_categories } from "@/app/lib/accounting-category";

const { Dragger } = Upload;
const { RangePicker } = DatePicker;

export default function CreateFundRequestSection() {
    const [open, setOpen] = useState(false);
    const { categories } = useSelector((store) => store.categories);
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
            files: [],
            date_range: [dayjs(), dayjs().add(3, "day")],
        },
    });

    async function submit_data(data) {
        const formData = new FormData();

        // Extract date range
        const [startDate, endDate] = data.date_range || [];

        // Append normal fields
        Object.entries(data).forEach(([key, value]) => {
            if (key === "date_range") return; // skip date_range array

            // Handle files array (e.g., data.files = FileList)
            if (key === "files" && value?.length) {
                Array.from(value).forEach((file, index) => {
                    console.log("filefile", file);
                    formData.append(`files[${index}]`, file.originFileObj);
                });
            } else {
                formData.append(key, value ?? "");
            }
        });

        // Append dates separately
        formData.append(
            "start",
            startDate ? moment(startDate.toISOString()).format("LLL") : ""
        );
        formData.append(
            "end",
            endDate ? moment(endDate.toISOString()).format("LLL") : ""
        );

        try {
            // send via axios or fetch
            await store.dispatch(create_tickets_thunk(formData));
            store.dispatch(get_tickets_by_user_thunk());
            await SwalAlert({
                type: "success",
            });
            reset();
            setOpen(false);
        } catch (err) {
            console.error("Submit error:", err);
        }
    }

    console.log("categories", categories);
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
                            <div>
                                <Controller
                                    control={control}
                                    name="date_range"
                                    rules={{
                                        required: "Please select a date range",
                                    }}
                                    render={({ field }) => (
                                        <DatePicker
                                            size="large"
                                            className="w-full border py-2.5 border-gray-900"
                                            onChange={field.onChange}
                                            value={field.value}
                                            disabledDate={(current) =>
                                                current &&
                                                current < dayjs().startOf("day")
                                            }
                                        />
                                    )}
                                />
                                {errors?.date_range && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.date_range.message}
                                    </p>
                                )}
                            </div>
                            {/* Category will add after approved */}
                            {/* <Select
                                label="Category"
                                name="category"
                                options={accounting_categories.map((res) => ({
                                    label: res.label,
                                    value: res.value,
                                }))}
                                error={errors?.category?.message}
                                register={register("category", {
                                    required: "This field is required",
                                })}
                            /> */}

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
                            />

                            <div className="overflow-auto">
                                <Controller
                                    name="files"
                                    control={control}
                                    {...register("files", {
                                        // No required rule = not required
                                    })}
                                    render={({ field }) => (
                                        <Dragger
                                            height={150}
                                            beforeUpload={() => false}
                                            multiple
                                            onChange={(info) =>
                                                field.onChange(info.fileList)
                                            }
                                            fileList={field.value}
                                        >
                                            <p className="ant-upload-drag-icon">
                                                <InboxOutlined />
                                            </p>
                                            <p className="ant-upload-text">
                                                Click or drag file to this area
                                                to upload
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
