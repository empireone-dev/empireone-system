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
import { department_slug } from "@/app/lib/search-lib";
import store from "@/app/store/store";
import {
    create_accounts_thunk,
    get_account_by_department_thunk,
} from "@/app/redux/account-thunk";
import SwalAlert from "@/app/_components/swal";
import { create_accounts_service } from "@/app/services/accounts-service";
import { get_categories_thunk } from "@/app/redux/categories-thunk";
import { create_categories_service } from "@/app/services/categories-service";

const { Dragger } = Upload;
const { RangePicker } = DatePicker;

export default function CreateCategorySection() {
    const [open, setOpen] = useState(false);
    const { sites } = useSelector((store) => store.sites);
    const queryParams = new URLSearchParams(window.location.search);
    const department = queryParams.get("department") ?? "";

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            department: department,
        },
    });
    async function submit_data(data) {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value ?? "");
        });

        try {
            await create_categories_service(formData);
            await store.dispatch(
                get_categories_thunk({
                    department: department,
                })
            );
            await SwalAlert({
                type: "success",
            });
            reset();
            setOpen(false);
        } catch (err) {
            await SwalAlert({
                type: "error",
                title: err.response.data.message,
            });
        }
    }
    console.log("sites", sites);
    return (
        <>
            <Button onClick={() => setOpen(true)}>Create Category</Button>
            <Modal
                width="max-w-lg"
                isOpen={open}
                onClose={setOpen}
                title={`Create ${department} Category`}
            >
                <form
                    onSubmit={handleSubmit(submit_data)}
                    className="flex flex-col gap-4"
                >
                    <div className="flex gap-4">
                        <div className="flex-1 flex flex-col gap-4">
                            <Input
                                label="Department"
                                type="text"
                                name="station"
                                disabled
                                value={department}
                            />
                            <Input
                                label="Category Name"
                                type="text"
                                name="name"
                                error={errors?.name?.message}
                                register={register("name", {
                                    required: "This field is required",
                                })}
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        SUBMIT
                    </Button>
                </form>
            </Modal>
        </>
    );
}
