import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import Input from "@/app/_components/input";
import Wysiwyg from "@/app/_components/wysiwyg";
import { DatePicker, Upload, Button as ButtonAntD } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
    create_engagement_activities_service,
    update_engagement_activities_service,
} from "@/app/services/engagement-activities-service";
import SwalAlert from "@/app/_components/swal";
import moment from "moment";
import store from "@/app/store/store";
import { get_engagement_activities_thunk } from "@/app/redux/engagement-thunk";

const { RangePicker } = DatePicker;

export default function EditActivitySection({ data }) {
    const [isOpen, setIsOpen] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
            files: [],
            id: data.id,
            date_range: [dayjs(), dayjs()],
        },
    });

    // ✅ Populate form when modal opens
    useEffect(() => {
        if (isOpen && data) {
            reset({
                name: data.name || "",
                description: data.description || "",
                files: data.files.map((res) => ({
                    id: res.id,
                    uid: res.id,
                    name: res.files.split("/").pop(),
                    status: "done",
                    url: res.files,
                })),
                id: data.id,
                date_range: [dayjs(data.start_at), dayjs(data.end_at)],
            });
        }
    }, [isOpen, data, reset]);

    // ✅ Handle form submission
    async function submit_data(params) {
        const formData = new FormData();

        // Format start/end times
        const start_at = params.date_range[0].format("MM-DD-YYYY HH:mm:ss");
        const end_at = params.date_range[1].format("MM-DD-YYYY HH:mm:ss");

        params.start_at = start_at;
        params.end_at = end_at;
        delete params.date_range;
        console.log("file.lastModified", params.files);
        Object.entries(params).forEach(([key, value]) => {
            if (key === "files") {
                // ✅ Append new files only
                value.forEach((file) => {
                    if (file.lastModified && file.originFileObj) {
                        formData.append("files[]", file.originFileObj);
                    }
                });

                // ✅ Handle deleted files
                data.files.forEach((existingFile) => {
                    const stillExists = value.some(
                        (uploadedFile) => uploadedFile.uid === existingFile.id
                    );

                    // If file no longer exists in the Upload list → mark for deletion
                    if (!stillExists) {
                        formData.append(`delete_files[]`, existingFile.id);
                    }
                });
            } else {
                formData.append(key, value ?? "");
            }
        });

        try {
            await update_engagement_activities_service(formData, data.id);
            await store.dispatch(get_engagement_activities_thunk());
            await SwalAlert({
                type: "success",
                title: "Activity updated successfully!",
            });
            setIsOpen(false);
            reset();
        } catch (error) {
            await SwalAlert({
                type: "error",
                title: "Error",
                text: error.message,
            });
        }
    }

    function remove_image(data) {
        if (data.lastModified) {
            return true;
        } else if (!data.lastModified) {
            return true;
        }
        return false;
    }

    return (
        <div>
            {/* ✅ Trigger Button */}
            <button
                className="my-4 underline text-blue-500"
                onClick={() => setIsOpen(true)}
            >
                ACTY-{data.id + moment(data.created_at).format("mdy")}
            </button>

            {/* ✅ Modal */}
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Edit Activity"
                width="w-4/5"
            >
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(submit_data)}
                >
                    <div className="flex flex-row gap-4">
                        {/* Left Section */}
                        <div className="flex flex-col gap-3 flex-1 mt-8">
                            <Input
                                label="Activity Name"
                                type="text"
                                name="name"
                                error={errors?.name?.message}
                                register={register("name", {
                                    required: "This field is required",
                                })}
                            />

                            {/* Date Range Picker */}
                            <div>
                                <Controller
                                    name="date_range"
                                    control={control}
                                    rules={{
                                        required: "Date range is required",
                                    }}
                                    render={({ field }) => (
                                        <RangePicker
                                            {...field}
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="border-gray-500"
                                            size="large"
                                            showTime={{
                                                format: "hh:mm A",
                                                use12Hours: true,
                                            }}
                                            format="MM-DD-YYYY hh:mm A"
                                            onOk={() => {}}
                                        />
                                    )}
                                />
                                {errors?.date_range && (
                                    <div className="text-red-500 text-sm mt-1">
                                        {errors.date_range.message}
                                    </div>
                                )}
                            </div>

                            {/* File Upload */}
                            <Controller
                                name="files"
                                control={control}
                                render={({ field }) => (
                                    <Upload
                                        listType="picture"
                                        beforeUpload={() => false}
                                        onChange={({ fileList }) =>
                                            field.onChange(fileList)
                                        }
                                        fileList={field.value}
                                        onRemove={(res) => remove_image(res)}
                                    >
                                        <ButtonAntD
                                            type="primary"
                                            icon={<UploadOutlined />}
                                        >
                                            Upload
                                        </ButtonAntD>
                                    </Upload>
                                )}
                            />
                        </div>

                        {/* Right Section */}
                        <div className="flex-1">
                            <Controller
                                name="description"
                                control={control}
                                rules={{
                                    required: "Description is required",
                                }}
                                render={({ field }) => (
                                    <Wysiwyg
                                        name="description"
                                        label="Description"
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors?.description?.message}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <Button loading={isSubmitting} type="submit">
                        SAVE CHANGES
                    </Button>
                </form>
            </Modal>
        </div>
    );
}
