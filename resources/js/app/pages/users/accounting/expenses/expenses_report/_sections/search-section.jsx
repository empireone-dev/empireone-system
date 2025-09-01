import Button from "@/app/_components/button";
import Select from "@/app/_components/select";
import { router } from "@inertiajs/react";
import React, { useState, useEffect } from "react";

export default function SearchSection() {
    const currentYear = new Date().getFullYear();
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");

    // Get existing query params from URL
    const searchParams = new URLSearchParams(window.location.search);
    const initialMonth = searchParams.get("month") || currentMonth;
    const initialYear = searchParams.get("year") || String(currentYear);

    const [search, setSearch] = useState({
        month: initialMonth,
        year: initialYear,
    });

    const startYear = 2024;
    const yearOptions = Array.from(
        { length: currentYear - startYear + 1 },
        (_, i) => {
            const year = startYear + i;
            return { label: String(year), value: String(year) };
        }
    );

    const monthOptions = [
        { label: "January", value: "01" },
        { label: "February", value: "02" },
        { label: "March", value: "03" },
        { label: "April", value: "04" },
        { label: "May", value: "05" },
        { label: "June", value: "06" },
        { label: "July", value: "07" },
        { label: "August", value: "08" },
        { label: "September", value: "09" },
        { label: "October", value: "10" },
        { label: "November", value: "11" },
        { label: "December", value: "12" },
    ];

    const handleSearch = () => {
        router.visit(`?month=${search.month}&year=${search.year}`);
    };

    return (
        <div className="flex gap-3">
            <Select
                label="Month"
                value={search.month}
                options={monthOptions}
                onChange={(e) =>
                    setSearch({ ...search, month: e.target.value })
                }
            />
            <Select
                label="Year"
                value={search.year}
                options={yearOptions.sort((a, b) => b.value - a.value)}
                onChange={(e) => setSearch({ ...search, year: e.target.value })}
            />
            <Button type="button" onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
}
