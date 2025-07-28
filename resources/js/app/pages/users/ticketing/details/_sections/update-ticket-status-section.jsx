import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import Button from "@/app/_components/button";
import Modal from "@/app/_components/modal";
import Select from "@/app/_components/select";
import SwalAlert from "@/app/_components/swal";
import TextArea from "@/app/_components/textarea";
import { ticket_id } from "@/app/lib/search-lib";
import { get_tickets_by_id_thunk } from "@/app/redux/ticket-thunk";
import { change_ticket_status_service } from "@/app/services/tickets-service";
import store from "@/app/store/store";

const QUICK_NOTES = [
    "Need more information",
    "Ticket resolved successfully",
    "Customer not responding",
    "Escalated to support",
    "Invalid request",
];

export default function UpdateTicketStatusSection() {
    const [open, setOpen] = useState(false);
    const [selectedNotes, setSelectedNotes] = useState([]);
    const { ticket } = useSelector((store) => store.tickets);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm({
        defaultValues: {
            notes: "",
            status: "",
        },
    });

    const handleQuickNoteSelect = (note) => {
        if (!selectedNotes.includes(note)) {
            setSelectedNotes((prev) => [...prev, note]);
        }
    };

    const handleRemoveNote = (note) => {
        setSelectedNotes((prev) => prev.filter((n) => n !== note));
    };

    const assignedTicket = async (data) => {
        try {
            const combinedNotes = [...selectedNotes, data.notes].filter(Boolean).join("\n");

            await change_ticket_status_service({
                ...ticket,
                status: data.status,
                notes: combinedNotes,
            });

            await store.dispatch(get_tickets_by_id_thunk(ticket_id()));
            await SwalAlert({ type: "success" });

            reset();
            setSelectedNotes([]);
            setOpen(false);
        } catch (error) {
            console.error("Error updating ticket:", error);
        }
    };

    const availableNotes = QUICK_NOTES.filter((note) => !selectedNotes.includes(note));

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
                    className="flex flex-col gap-4"
                    onSubmit={handleSubmit(assignedTicket)}
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

                    <TextArea
                        register={register("notes")}
                        error={errors?.notes?.message}
                        name="notes"
                        label="Additional Notes"
                    />

                    {selectedNotes.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {selectedNotes.map((note, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center border border-gray-400 rounded-full px-3 py-1 bg-gray-100 text-sm"
                                >
                                    {note}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveNote(note)}
                                        className="ml-2 text-red-500 hover:text-red-700 font-bold"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <hr className="my-4 border-gray-500" />

                    <div className="flex flex-wrap gap-2">
                        {availableNotes.map((note, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => handleQuickNoteSelect(note)}
                                className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {note}
                            </button>
                        ))}
                    </div>

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
