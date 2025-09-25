import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Button from "@/app/_components/button";
import Select from "@/app/_components/select";
import Modal from "@/app/_components/modal";

const { Dragger } = Upload;

export default function FileUploadButton() {
    const [open, setOpen] = useState(false);
    const file_data = [
        { value: "quotation", label: "Quotation" },
        { value: "receipt", label: "Receipt" },
    ];

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            files: [],
        },
    });

    const onSubmit = (data) => {
        console.log("Uploaded files:", data.files);
        setOpen(false);
    };

    return (
        <>
            <Button variant="outline" onClick={() => setOpen(true)}>
                File Upload
            </Button>

            <Modal
                width="max-w-sm"
                isOpen={open}
                onClose={() => setOpen(false)}
                title="File upload"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <div className="flex flex-col gap-5 mt-5">
                            <div className="mt-4">
                                <Select
                                    label="File"
                                    name="file"
                                    options={file_data}
                                />
                            </div>

                            <Controller
                                name="files"
                                control={control}
                                {...register("files")}
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
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
