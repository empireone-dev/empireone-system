import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Select from "@/app/_components/select";
import SwalAlert from "@/app/_components/swal";
import { department_data } from "@/app/lib/department-lib";
import { ticket_id } from "@/app/lib/search-lib";
import { get_tickets_by_id_thunk } from "@/app/redux/ticket-thunk";
import { change_ticket_status_service } from "@/app/services/tickets-service";
import store from "@/app/store/store";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function UpdateTicketStatusSection() {
    const [open, setOpen] = useState(false);
    const { ticket } = useSelector((store) => store.tickets);
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {},
    });
    async function assigned_ticket(data) {
        try {
            await change_ticket_status_service({
                ...ticket,
                status: data.status,
            });
            await store.dispatch(get_tickets_by_id_thunk(ticket_id()));
            await SwalAlert({
                type: "success",
            });
            reset();
            setOpen(false);
        } catch (error) {}
    }
    return (
        <>
            <Button onClick={() => setOpen(true)} variant="primary">
                Update Ticket Status
            </Button>
            <Modal
                isOpen={open}
                width="max-w-xl"
                onClose={() => setOpen(false)}
                title="Change Ticket Status"
            >
                <form
                    className="flex flex-col gap-3"
                    onSubmit={handleSubmit(assigned_ticket)}
                >
                    <Select
                        label="Change Status"
                        name="status"
                        options={[
                            { label: "Closed", value: "Closed" },
                            { label: "Declined", value: "Declined" },
                        ]}
                        error={errors?.status?.message}
                        register={register("status", {
                            required: "This field is required",
                        })}
                    />
                    <Button
                        type="submit"
                        variant="primary"
                        loading={isSubmitting}
                    >
                        Submit
                    </Button>
                </form>
            </Modal>
        </>
    );
}
