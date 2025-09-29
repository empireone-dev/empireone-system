import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Button from "@/app/_components/button";
import Select from "@/app/_components/select";
import Modal from "@/app/_components/modal";
import { add_logs_service } from "@/app/services/accounting-purchase-request";
import store from "@/app/store/store";
import { get_purchase_request_by_id_thunk } from "@/app/redux/accounting-thunk";
import TextArea from "@/app/_components/textarea";
import { useSelector } from "react-redux";

const { Dragger } = Upload;

export default function FileUploadButton() {
    const [open, setOpen] = useState(false);
    const accounting_purchase_requests_id = window.location.pathname
        .split("/")
        .pop();
    const { purchase_request } = useSelector((store) => store.accounting);

    const notes_data = [
        { value: "Quotation Uploaded", label: "Quotation" },
        { value: "Receipt Uploaded", label: "Receipt" },
    ];

    const filtered = notes_data?.filter(
        (obj2) =>
            !purchase_request?.logs?.some((obj1) => obj1.status === obj2.value)
    );

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            files: [],
        },
    });

    const onSubmit = async (data) => {
        const new_data = {
            accounting_purchase_requests_id: accounting_purchase_requests_id,
            ...data,
        };
        const formData = new FormData();

        Object.entries(new_data).forEach(([key, value]) => {
            if (key === "files" && value?.length) {
                const file = value[0];
                formData.append("file", file.originFileObj);
            } else {
                formData.append(key, value ?? "");
            }
        });
        try {
            await add_logs_service(formData);
            await store.dispatch(
                get_purchase_request_by_id_thunk(
                    accounting_purchase_requests_id
                )
            );
            reset();
            setOpen(false);
            console.log("Uploaded files:", data.files);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
        <>
            <Button
                disabled={filtered.length === 0}
                variant="outline"
                onClick={() => setOpen(true)}
            >
                File Upload
            </Button>

            <Modal
                width="max-w-xl"
                isOpen={open}
                onClose={() => {
                    setOpen(false);
                    reset();
                }}
                title="File upload"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="flex flex-col gap-5">
                            <Select
                                label="File"
                                name="status"
                                options={filtered}
                                register={register("status", {
                                    required: "This field is required",
                                })}
                                error={errors?.status?.message}
                            />

                            <Controller
                                name="files"
                                control={control}
                                rules={{ required: "This field is required"}}
                                register={register("files", {
                                    required: "This field is required",
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
                                            Click or drag file to this area to
                                            upload
                                        </p>
                                    </Dragger>
                                )}
                            />
                            {errors?.files && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.files.message}
                                </p>
                            )}
                            <TextArea
                                label="Additional information"
                                error={errors?.notes?.message}
                                register={register("notes", {
                                    required: "This field is required",
                                })}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button
                            loading={isSubmitting}
                            type="submit"
                            variant="primary"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
