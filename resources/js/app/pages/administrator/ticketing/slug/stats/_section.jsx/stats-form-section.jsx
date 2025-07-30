import Button from "@/app/_components/button";
import TextArea from "@/app/_components/textarea";
import { ticketing_prompt_stats_thunk } from "@/app/redux/ticket-thunk";
import store from "@/app/store/store";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

export default function StatsFormSection() {
    const { stats } = useSelector((store) => store.tickets);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            date_range: [moment().subtract(30, "days"), moment()],
        },
    });

    async function submit_data(params) {
        try {
            // await store.dispatch(ticketing_prompt_stats_thunk(params.prompts));
            reset();
        } catch (error) {}
    }

    return (
        <>
            <form
                className="flex flex-col gap-5 mt-5"
                onSubmit={handleSubmit(submit_data)}
            >
                <TextArea
                    register={register("prompts", {
                        required: "This field is required",
                    })}
                    error={errors?.prompts?.message}
                    label="Prompts"
                    type="text"
                    name="prompts"
                    // onKeyDown={(e) => {
                    //     if (e.key === "Enter" && !e.shiftKey) {
                    //         e.preventDefault(); // Prevent new line
                    //         handleSubmit(submit_data)(); // Trigger form submit
                    //     }
                    // }}
                />
                <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                >
                    SUBMIT
                </Button>
            </form>
        </>
    );
}
