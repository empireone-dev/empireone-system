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
import Checkbox from "@/app/_components/checkbox";
import Radio from "@/app/_components/radio";
import SwalAlert from "@/app/_components/swal";

const { Dragger } = Upload;

export default function FileUploadButton() {
    const [open, setOpen] = useState(false);
    const { purchase_request } = useSelector((store) => store.accounting);
    const notes_data = [
        { value: "Paid", label: "Paid" },
        { value: "Ordered", label: "Ordered" },
        { value: "Received", label: "Received" },
        { value: "Completed", label: "Completed" },
        { value: "Partial Payment", label: "Partial Payment" },
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
            payment_method: null,
        },
    });

    const watchedStatus = watch("status");

    // Clear payment methods when status changes and it's not "Paid"
    React.useEffect(() => {
        if (watchedStatus !== "Paid") {
            setValue("payment_method", null);
        }
    }, [watchedStatus, setValue]);

    const onSubmit = async (data) => {
        console.log("Uploaded files:", data.files);
        console.log("Payment methods:", data.payment_method);
        const new_data = {
            accounting_purchase_requests_id: accounting_purchase_requests_id,
            ...data,
        };
        const formData = new FormData();

        Object.entries(new_data).forEach(([key, value]) => {
            if (key === "files" && value?.length) {
                const file = value[0];
                formData.append("file", file.originFileObj);
            } else if (key === "payment_method" && Array.isArray(value)) {
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
            await SwalAlert({
                type: "success",
            });
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

                            {(watchedStatus === "Paid" ||
                                watchedStatus === "Partial Payment") && (
                                <div className="w-full">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Payment Methods
                                    </label>
                                    <div className="flex gap-3">
                                        {["Bank", "Cash", "Cheque"].map(
                                            (method, i) => (
                                                <div>
                                                    <Radio
                                                        register={register(
                                                            "payment_method",
                                                            {
                                                                required:
                                                                    "This field is required",
                                                            }
                                                        )}
                                                        key={i}
                                                        value={method}
                                                        label={method}
                                                        name={"payment_method"}
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {errors?.payment_method && (
                                        <div className="text-red-600 text-sm mt-1">
                                            {errors?.payment_method?.message}
                                        </div>
                                    )}
                                </div>
                            )}

                            <TextArea
                                name={"notes"}
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
