import React, { useState } from "react";
import TextArea from "@/app/_components/textarea";
import Button from "@/app/_components/button";
import { useSelector } from "react-redux";
import { create_tickets_service } from "@/app/services/tickets-service";
import { useForm } from "react-hook-form";
import SwalAlert from "@/app/_components/swal";
import store from "@/app/store/store";
import { get_tickets_by_id_thunk } from "@/app/redux/ticket-thunk";
import { ticket_id } from "@/app/lib/search-lib";
import { create_notes_service } from "@/app/services/notes-service";

export default function AddCommentSection() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({});
    const { ticket } = useSelector((store) => store.tickets);

    async function submit_data(data) {
        try {
            await create_notes_service({
                ...ticket,
                ...data,
            });
            await store.dispatch(get_tickets_by_id_thunk(ticket_id()));
            await SwalAlert({
                type: "success",
            });
            reset();
        } catch (error) {
            await SwalAlert({
                type: "error",
            });
        }
    }
    return (
        <>
            <div className=" flex gap-x-3">
                <form
                    o
                    onSubmit={handleSubmit(submit_data)}
                    className="relative flex-auto"
                >
                    <div className="rounded-lg pb-12 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                        <TextArea
                            register={register("notes", {
                                required: "This field is required",
                            })}
                            error={errors?.notes?.message}
                            rows={1}
                            name="notes"
                            label="Notes"
                        />
                    </div>

                    <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 ">
                        <Button 
                        loading={isSubmitting}
                        type="submit" className="w-full">
                            Comment
                        </Button>
                    </div>
                </form>
            </div>
        </>
    );
}
