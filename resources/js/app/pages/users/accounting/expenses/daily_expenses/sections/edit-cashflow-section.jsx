import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import Select from "@/app/_components/select";
import SwalAlert from "@/app/_components/swal";
import { accounting_categories } from "@/app/lib/accounting-category";
import { get_accounting_cash_flows_thunk } from "@/app/redux/accounting-thunk";
import { update_accounting_cash_flows_service } from "@/app/services/accounting-cash-flows";
import store from "@/app/store/store";
import { DatePicker, Image } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function EditCashflowSection() {
    const { cash_flow } = useSelector((state) => state.accounting);
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            starting_balance: "",
            cash_withdrawn: "",
            total: "", // single date (can change to array for range)
        },
    });

    useEffect(() => {
        setValue("cash_withdrawn", cash_flow?.cash_withdrawn);
        setValue("starting_balance", cash_flow?.starting_balance);
        setValue("total", cash_flow?.total);
    }, [open]);

    async function submit_data(data) {
        await update_accounting_cash_flows_service({
            ...data,
            id: cash_flow?.id,
        });
        await store.dispatch(get_accounting_cash_flows_thunk());
        await SwalAlert({ type: "success" });
        reset();
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)}>EDIT CASH FLOW</Button>
            <Modal
                width="max-w-lg"
                title="EDIT CASH FLOW"
                isOpen={open}
                onClose={setOpen}
            >
                <form
                    onSubmit={handleSubmit(submit_data)}
                    className="flex flex-col gap-4"
                >
                    <Input
                        label="Starting Balance"
                        type="number"
                        name="starting_balance"
                        error={errors?.starting_balance?.message}
                        register={register("starting_balance", {
                            required: "This field is required",
                        })}
                    />

                    <Input
                        label="Cash Withdrawn"
                        type="number"
                        name="cash_withdrawn"
                        error={errors?.cash_withdrawn?.message}
                        register={register("cash_withdrawn", {
                            required: "This field is required",
                        })}
                    />

                    <Input
                        label="Total"
                        type="number"
                        name="total"
                        error={errors?.total?.message}
                        register={register("total", {
                            required: "This field is required",
                        })}
                    />

                    <Button
                        type="submit"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        SUBMIT
                    </Button>
                </form>
            </Modal>
        </div>
    );
}
