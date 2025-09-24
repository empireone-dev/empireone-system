import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Button from "@/app/_components/button";
import Select from "@/app/_components/select";
import Modal from "@/app/_components/modal";
import TextArea from "@/app/_components/textarea";

const { Dragger } = Upload;

export default function FileUploadButton() {
    const [open, setOpen] = useState(false);
    const status_data = [
        { value: "ordered", label: "Ordered" },
        { value: "received", label: "Received" },
        { value: "completed", label: "Completed" },
    ];
    //  const {
    //         register,
    //         handleSubmit,
    //         setValue,
    //         formState: { errors, isSubmitting },
    //         reset,
    //     } = useForm({
    //         defaultValues: {
    //             department: "",
    //             accounting: "",
    //             priority: "",
    //             request_no: "",
    //             date: "",
    //         },
    //     });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            add_info: "",
            files: [],
        },
    });

    const onSubmit = (data) => {
        console.log("Uploaded files:", data.files);
        setOpen(false);
    };

    return (
        <>
            <Button variant="success" onClick={() => setOpen(true)}>
                Status Update
            </Button>

            <Modal
                width="max-w-md"
                isOpen={open}
                onClose={() => setOpen(false)}
                title="Status Update"
            >
                <form
                    className="h-64 flex flex-col items-center justify-between w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="w-full">
                        <div className="flex flex-col gap-5 mt-5">
                            <Select
                                label="Status"
                                name="status"
                                options={status_data}
                            />
                            <TextArea
                                label="Additional information"
                                error={errors?.add_info?.message}
                                register={register("add_info", {
                                    required: "This field is required",
                                })}
                            />
                        </div>
                    </div>

                    <div className="flex items-end w-full justify-end mt-4">
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
