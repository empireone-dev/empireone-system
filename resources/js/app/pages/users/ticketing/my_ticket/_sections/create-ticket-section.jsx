import React, { useState } from "react";
import axios from "axios";
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
import { department_data } from "@/app/lib/department-lib";
import { get_categories_thunk } from "@/app/redux/categories-thunk";
import SwalAlert from "@/app/_components/swal";

const { Dragger } = Upload;
const { RangePicker } = DatePicker;

export default function CreateTicketSection() {
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

    function select_department(value) {
        store.dispatch(
            get_categories_thunk({
                department: value,
            })
        );
    }
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
            <Button onClick={() => setOpen(true)}>Create Ticket</Button>
            <Modal
                width="max-w-5xl"
                isOpen={open}
                onClose={setOpen}
                title="Create Ticket"
            >
                <form
                    onSubmit={handleSubmit(submit_data)}
                    className="flex flex-col gap-4"
                >
                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-4">
                            <Select
                                label="Department"
                                name="department"
                                options={department_data}
                                error={errors?.department?.message}
                                register={register("department", {
                                    required: "This field is required",
                                })}
                                onChange={(e) =>
                                    select_department(e.target.value)
                                }
                            />
                            <Select
                                label="Category"
                                name="category_id"
                                options={categories.map((res) => ({
                                    label: res.name,
                                    value: res.id,
                                }))}
                                error={errors?.category_id?.message}
                                register={register("category_id", {
                                    required: "This field is required",
                                })}
                            />

                            <Select
                                label="Site"
                                name="site_id"
                                options={[...sites]
                                    .sort((a, b) =>
                                        a.name.localeCompare(b.name)
                                    )
                                    .map((res) => ({
                                        label: res.name,
                                        value: res.id,
                                    }))}
                                error={errors?.site_id?.message}
                                register={register("site_id", {
                                    required: "This field is required",
                                })}
                            />

                            <Select
                                label="Urgent Type"
                                name="isUrgent"
                                options={[
                                    {
                                        label: "Low Priority",
                                        value: "Low Priority",
                                    },
                                    {
                                        label: "Medium Priority",
                                        value: "Medium Priority",
                                    },
                                    {
                                        label: "High Priority",
                                        value: "High Priority",
                                    },
                                ]}
                                error={errors?.isUrgent?.message}
                                register={register("isUrgent", {
                                    required: "This field is required",
                                })}
                            />

                            <Input
                                label="Station/Room etc."
                                type="text"
                                name="station"
                                error={errors?.station?.message}
                                register={register("station", {
                                    required: "This field is required",
                                })}
                            />
                            <div>
                                <Controller
                                    control={control}
                                    name="date_range"
                                    rules={{
                                        required: "Please select a date range",
                                    }}
                                    render={({ field }) => (
                                        <RangePicker
                                            size="large"
                                            className="w-full border border-gray-900"
                                            showTime
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
                        </div>

                        <div className="flex-1 flex flex-col">
                            <Controller
                                name="details"
                                control={control}
                                rules={{ required: "Details is required" }}
                                render={({ field }) => (
                                    <Wysiwyg
                                        label="Details Request"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors?.details?.message}
                                    />
                                )}
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
                        SUBMIT TICKET
                    </Button>
                </form>
            </Modal>
        </>
    );
}
