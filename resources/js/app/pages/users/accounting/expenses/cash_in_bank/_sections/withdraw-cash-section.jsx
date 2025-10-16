import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Modal from "@/app/_components/modal";
import Select from "@/app/_components/select";
import SwalAlert from "@/app/_components/swal";
import TextArea from "@/app/_components/textarea";
import { accounting_categories } from "@/app/lib/accounting-category";
import {
    get_accounting_cash_flows_thunk,
    get_cash_in_bank_thunk,
    get_debit_records_thunk,
} from "@/app/redux/accounting-thunk";
import { update_accounting_cash_flows_service } from "@/app/services/accounting-cash-flows";
import { update_cash_in_bank_service } from "@/app/services/accounting-cash-in-bank-service";
import { create_debit_records_service } from "@/app/services/debit-records-service";
import store from "@/app/store/store";
import { DatePicker, Image } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function WithdrawCashSection() {
    const { cash_in_bank } = useSelector((state) => state.accounting);
    const [open, setOpen] = useState(false);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm({});

    async function submit_data(data) {
        await create_debit_records_service({
            ...data,
            cash_in_bank_id: cash_in_bank.id,
        });
        await store.dispatch(get_cash_in_bank_thunk());
        await store.dispatch(get_debit_records_thunk());
        await SwalAlert({ type: "success" });
        reset();
        setOpen(false);
    }

    return (
        <div>
            <Button variant="success" onClick={() => setOpen(true)}>
                Withdraw Cash
            </Button>
            <Modal
                width="max-w-lg"
                title="Withdraw Cash"
                isOpen={open}
                onClose={setOpen}
            >
                <form
                    onSubmit={handleSubmit(submit_data)}
                    className="flex flex-col gap-4"
                >
                    <Input
                        label="Amount"
                        type="number"
                        name="amount"
                        error={errors?.amount?.message}
                        register={register("amount", {
                            required: "This field is required",
                        })}
                    />

                    <TextArea
                        label="Description"
                        name="description"
                        error={errors?.description?.message}
                        register={register("description", {
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
