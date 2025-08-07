import { peso_value } from "@/app/lib/peso-value";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";

export default function DailyExpensesDetails() {
    const { expenses, cash_flow } = useSelector((state) => state.accounting);
    const { user } = useSelector((state) => state.accounts);
    const totalAmount = expenses?.data?.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    );
    console.log("cash_flow", cash_flow);
    return (
        <>
            <div className=" rounded-t-lg px-4 py-8 shadow-xs ring-1 ring-gray-300 sm:mx-0  sm:px-8 sm:pb-14 lg:col-span-2 lg:row-span-2 lg:row-end-2 xl:px-8 xl:pt-8 xl:pb-20">
                <h2 className="text-base font-semibold text-gray-900">
                    DAILY EXPENSES REPORT
                </h2>
                <dl className="mt-6 grid grid-cols-1 text-sm/6 sm:grid-cols-2">
                    <div className="sm:pr-4">
                        <dt className="inline text-gray-900">Date:</dt>{" "}
                        <dd className="inline text-gray-900">
                            <time dateTime="2023-23-01">
                                {moment().format("LL")}
                            </time>
                        </dd>
                    </div>
                    <div className="mt-2 sm:mt-0 sm:pl-4">
                        <dd className="inline text-gray-900">
                            <time dateTime="2023-31-01">
                                Accounting Department
                            </time>
                        </dd>
                    </div>
                    <div className="mt-8 sm:mt-6 sm:border-t sm:border-gray-900/5 sm:pt-6 sm:pl-4">
                        <dd className="flex flex-col gap-1 mt-2 text-gray-900">
                            <span className="font-medium text-gray-900">
                                Starting Balance:{" "}
                                {peso_value(cash_flow?.starting_balance)}
                            </span>
                            <span className="font-medium text-gray-900">
                                Cash Withdrawn:{" "}
                                {peso_value(cash_flow?.cash_withdrawn)}
                            </span>

                            <span className="font-medium text-gray-900">
                                Total: {" "}{peso_value(cash_flow?.total)}
                            </span>

                            <span className="font-medium text-gray-900">
                                Balance:{" "}
                                {peso_value(
                                    Number(cash_flow?.total) - totalAmount
                                )}
                            </span>
                        </dd>
                    </div>
                    <div className="mt-6 border-t border-gray-900/5 pt-6 sm:pr-4">
                        <dd className="mt-2 text-gray-900">
                            <span className="font-medium text-gray-900">
                                {user.name}
                            </span>
                            <br />
                            System User
                        </dd>
                        <dd className="mt-2 text-gray-900">
                            <span className="font-medium text-gray-900">
                                TOTAL AMOUNT OF ITEM:
                            </span>
                            <br />₱ {totalAmount?.toFixed(2)}
                        </dd>
                    </div>
                </dl>
            </div>
        </>
    );
}
