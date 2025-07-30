import Button from "@/app/_components/button";
import Input from "@/app/_components/input";
import Select from "@/app/_components/select";
import { department_data } from "@/app/lib/department-lib";
import { router } from "@inertiajs/react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import React from "react";
import { Controller, useForm } from "react-hook-form";

const { RangePicker } = DatePicker;

export default function StatsSearchSection() {
    // Parse query params from URL
    const params = new URLSearchParams(window.location.search);

    const start_date = params.get("start_date");
    const end_date = params.get("end_date");

    const defaultDateRange =
        start_date && end_date ? [dayjs(start_date), dayjs(end_date)] : null;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            location: params.get("location") || "",
            department: params.get("department") || "",
            date_range: defaultDateRange,
        },
    });

    function search_data(data) {
        const [start, end] = data.date_range || [];

        const formattedData = {
            ...data,
            start_date: start ? dayjs(start).format("YYYY-MM-DD HH:mm:ss") : "",
            end_date: end ? dayjs(end).format("YYYY-MM-DD HH:mm:ss") : "",
        };

        delete formattedData.date_range;

        router.visit("/administrator/ticketing/slug/stats", {
            method: "get",
            data: formattedData,
            preserveState: true,
        });
    }

    return (
        <form
            onSubmit={handleSubmit(search_data)}
            className="flex gap-3 items-center w-full py-3"
        >
            <div className="w-full">
                <Select
                    label="Location"
                    name="location"
                    options={[
                        { label: "San Carlos", value: "San Carlos" },
                        { label: "Carcar", value: "Carcar" },
                    ]}
                    error={errors?.location?.message}
                    register={register("location")}
                />
            </div>
            <div className="w-full">
                <Select
                    label="Department"
                    name="department"
                    options={department_data}
                    error={errors?.department?.message}
                    register={register("department")}
                />
            </div>
            <div className="w-full">
                <Controller
                    control={control}
                    name="date_range"
                    render={({ field }) => (
                        <RangePicker
                            size="large"
                            className="w-full border py-2.5 border-gray-900"
                            // showTime
                            onChange={field.onChange}
                            value={field.value}
                        />
                    )}
                />
                {errors.date_range && (
                    <p className="text-red-600 text-sm mt-1">
                        {errors.date_range.message}
                    </p>
                )}
            </div>
            <div className="w-full">
                <Button
                    className="w-full"
                    type="submit"
                    loading={isSubmitting}
                    disabled={isSubmitting}
                >
                    SEARCH
                </Button>
            </div>
        </form>
    );
}
