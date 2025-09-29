import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Button from "@/app/_components/button";
import Select from "@/app/_components/select";
import Modal from "@/app/_components/modal";
import TextArea from "@/app/_components/textarea";
import { add_logs_service } from "@/app/services/accounting-purchase-request";
import store from "@/app/store/store";
import { get_purchase_request_by_id_thunk } from "@/app/redux/accounting-thunk";
import { useSelector } from "react-redux";

const { Dragger } = Upload;

export default function FileUploadButton() {
    const [open, setOpen] = useState(false);
    const { purchase_request } = useSelector((store) => store.accounting);
    const notes_data = [
        { value: "Ordered", label: "Ordered" },
        { value: "Received", label: "Received" },
        { value: "Completed", label: "Completed" },
    ];

    const filtered = notes_data.filter(
        (obj2) =>
            !purchase_request?.logs?.some((obj1) => obj1.status === obj2.value)
    );

    const accounting_purchase_requests_id = window.location.pathname
        .split("/")
        .pop();
    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            status: "",
            files: [],
        },
    });

    const onSubmit = async (data) => {
        console.log("Uploaded files:", data.files);
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
            <Button variant="success" onClick={() => setOpen(true)}>
                Status Update
            </Button>

            <Modal
                width="max-w-md"
                isOpen={open}
                onClose={() => {
                    setOpen(false);
                    reset();
                }}
                title="Status Update"
            >
                <form
                    className="h-64 flex flex-col items-center justify-between w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="w-full">
                        <div className="flex flex-col gap-5">
                            <Select
                                label="Status"
                                name="status"
                                options={filtered}
                                register={register("status", {
                                    required: "This field is required",
                                })}
                                error={errors?.status?.message}
                            />
                            <TextArea
                                label="Additional information"
                                error={errors?.notes?.message}
                                register={register("notes", {
                                    required: "This field is required",
                                })}
                            />
                        </div>
                    </div>

                    <div className="flex items-end w-full justify-end mt-4">
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
