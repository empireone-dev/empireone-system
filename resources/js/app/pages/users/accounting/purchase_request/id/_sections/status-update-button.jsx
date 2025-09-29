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
        { value: "Paid", label: "Paid" },
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
        watch,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            status: "",
            files: [],
            payment_methods: [],
        },
    });

    const watchedStatus = watch("status");

    // Clear payment methods when status changes and it's not "Paid"
    React.useEffect(() => {
        if (watchedStatus !== "Paid") {
            setValue("payment_methods", []);
        }
    }, [watchedStatus, setValue]);

    const onSubmit = async (data) => {
        console.log("Uploaded files:", data.files);
        console.log("Payment methods:", data.payment_methods);
        const new_data = {
            accounting_purchase_requests_id: accounting_purchase_requests_id,
            ...data,
        };
        const formData = new FormData();

        Object.entries(new_data).forEach(([key, value]) => {
            if (key === "files" && value?.length) {
                const file = value[0];
                formData.append("file", file.originFileObj);
            } else if (key === "payment_methods" && Array.isArray(value)) {
                formData.append(key, JSON.stringify(value));
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

    const handleModalClose = () => {
        setOpen(false);
        reset();
    };

    return (
        <>
            <Button variant="success" onClick={() => setOpen(true)}>
                Status Update
            </Button>

            <Modal
                width="max-w-md"
                isOpen={open}
                onClose={handleModalClose}
                title="Status Update"
            >
                <form
                    className="h-auto flex flex-col items-center justify-between w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="w-full">
                        <div className="flex flex-col gap-5">
                            <Controller
                                name="status"
                                control={control}
                                rules={{ required: "This field is required" }}
                                render={({ field }) => (
                                    <Select
                                        label="Status"
                                        name="status"
                                        options={filtered}
                                        value={field.value}
                                        onChange={field.onChange}
                                        error={errors?.status?.message}
                                    />
                                )}
                            />

                            {watchedStatus === "Paid" && (
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Payment Methods
                                    </label>
                                    <div className="flex gap-5">
                                        {["Bank", "Cash", "Cheque"].map((method) => (
                                            <label key={method} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    value={method}
                                                    {...register("payment_methods")}
                                                    className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <span className="text-sm text-gray-700">{method}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {errors?.payment_methods && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.payment_methods.message}
                                        </p>
                                    )}
                                </div>
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
