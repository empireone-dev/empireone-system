import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import React, { useState } from "react";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import Input from "@/app/_components/input";
import Wysiwyg from "@/app/_components/wysiwyg";
import { DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button as ButtonAntD } from "antd";
import { create_engagement_activities_service } from "@/app/services/engagement-activities-service";
import SwalAlert from "@/app/_components/swal";
const { RangePicker } = DatePicker;

export default function CreateActivitySection() {
    const [isOpen, setIsOpen] = useState(false);
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
            date_range: [dayjs(), dayjs()],
        },
    });

    async function submit_data(params) {
        const formData = new FormData();
        const start_at = params.date_range[0].format("MM-DD-YYYY HH:mm:ss");
        const end_at = params.date_range[1].format("MM-DD-YYYY HH:mm:ss");
        params.start_at = start_at;
        params.end_at = end_at;
        delete params.date_range;
        Object.entries(params).forEach(([key, value]) => {
            if (key === "date_range") return;
            if (key === "files" && value?.length) {
                Array.from(value).forEach((file, index) => {
                    console.log("filefile", file);
                    formData.append(`files[${index}]`, file.originFileObj);
                });
            } else {
                formData.append(key, value ?? "");
            }
        });
        try {
            await create_engagement_activities_service(formData);
            await SwalAlert({
                type: "success",
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

    const onOk = (value) => {
        console.log("onOk: ", value);
    };
    return (
        <div>
            <Button className="my-4" onClick={() => setIsOpen(!isOpen)}>
                Create Activity
            </Button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Create Activity"
                width="w-3/5"
            >
                <form
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(submit_data)}
                >
                    <div className="flex flex-row gap-4">
                        <div className="flex-col gap-3 flex flex-1 mt-8">
                            <Input
                                label="Activity Name"
                                type="text"
                                name="name"
                                error={errors?.name?.message}
                                register={register("name", {
                                    required: "This field is required",
                                })}
                            />
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
                                            value={field.value} // ✅ Connects value
                                            onChange={(value) =>
                                                field.onChange(value)
                                            } // ✅ Updates react-hook-form
                                            className="border-gray-500"
                                            size="large"
                                            showTime={{
                                                format: "hh:mm A",
                                                use12Hours: true,
                                            }}
                                            format="MM-DD-YYYY hh:mm A"
                                            disabledDate={(current) =>
                                                current &&
                                                current < dayjs().startOf("day")
                                            }
                                            onOk={onOk}
                                        />
                                    )}
                                />
                                {errors?.date_range && (
                                    <div className="text-red-500 text-sm">
                                        {errors.date_range.message}
                                    </div>
                                )}
                            </div>
                            <Controller
                                name="files"
                                control={control}
                                render={({ field }) => (
                                    <Upload
                                        listType="picture"
                                        beforeUpload={() => false} // prevent auto-upload
                                        onChange={({ fileList }) =>
                                            field.onChange(fileList)
                                        }
                                        fileList={field.value}
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
                        <div className="flex-1">
                            <Controller
                                name="description"
                                control={control}
                                rules={{ required: "Description is required" }}
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
                        SUBMIT
                    </Button>
                </form>
            </Modal>
        </div>
    );
}
