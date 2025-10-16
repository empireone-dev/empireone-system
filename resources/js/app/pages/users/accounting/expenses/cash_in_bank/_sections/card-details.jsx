import { peso_value } from "@/app/lib/peso-value";
import React from "react";
import { useSelector } from "react-redux";

export default function CardDescription() {
    const { cash_in_bank } = useSelector((state) => state.accounting);
    return (
        <div className="flex items-center justify-evenly border-2 border-blue-500  p-4 rounded-lg">
            <div className="mt-2 sm:mt-0 sm:pl-4">
                <dd className="inline font-bold text-gray-900">
                    <time dateTime="2023-31-01">Balance:</time>
                </dd>
            </div>
            <div className="mt-2 sm:mt-0 sm:pl-4">
                <dd className="inline text-gray-900">
                    <time dateTime="2023-31-01">
                        {peso_value(cash_in_bank.balance)}
                    </time>
                </dd>
            </div>
        </div>
    );
}
