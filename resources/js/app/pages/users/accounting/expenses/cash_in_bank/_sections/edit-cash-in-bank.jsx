import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import Select from "@/app/_components/select";
import SwalAlert from "@/app/_components/swal";
import { accounting_categories } from "@/app/lib/accounting-category";
import {
    get_accounting_cash_flows_thunk,
    get_cash_in_bank_thunk,
} from "@/app/redux/accounting-thunk";
import { update_accounting_cash_flows_service } from "@/app/services/accounting-cash-flows";
import { update_cash_in_bank_service } from "@/app/services/accounting-cash-in-bank-service";
import store from "@/app/store/store";
import { DatePicker, Image } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function EditCashInBank() {
    const { cash_in_bank } = useSelector((state) => state.accounting);
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
            balance: "",
        },
    });

    useEffect(() => {
        setValue("balance", cash_in_bank?.balance);
    }, [open]);

    async function submit_data(data) {
        await update_cash_in_bank_service({
            ...data,
            id: cash_in_bank?.id,
        });
        await store.dispatch(get_cash_in_bank_thunk());
        await SwalAlert({ type: "success" });
        reset();
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={() => setOpen(true)}>EDIT CASH IN BANK</Button>
            <Modal
                width="max-w-lg"
                title="EDIT CASH IN BANK"
                isOpen={open}
                onClose={setOpen}
            >
                <form
                    onSubmit={handleSubmit(submit_data)}
                    className="flex flex-col gap-4"
                >
                    <Input
                        label="Balance"
                        type="number"
                        name="balance"
                        error={errors?.balance?.message}
                        register={register("balance", {
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
