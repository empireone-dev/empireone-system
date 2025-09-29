import React from "react";
import moment from "moment";
import { peso_value } from "@/app/lib/peso-value";
import FileUploadSection from "../../_sections/file-upload-section";
import StatusUpdateSection from "../../_sections/status-update-section";

export default function DescriptionSection() {
    // You'll need to add these props or get them from Redux/context
    // const { voucher_request, user } = useSelector((store) => store.accounting);

    // Sample data for now
    const voucher_request = {
        request_no: "VR-001",
        requestor: { name: "John Doe" },
        department: "IT Department",
        categories: "Office Supplies",
        amount: 25000,
        purpose: "Purchase of office supplies",
        date: new Date(),
    };

    const grand_total_cost =
        voucher_request?.items?.reduce(
            (total, item) => total + item.total_cost,
            0
        ) || 0;
    const user = { department: "Accounting Department" };
    const not_completed = true;
    const filtered = [1, 2, 3, 4]; // Sample filtered array

    return (
        <>
            <div className="mb-6">
                <h2 className="text-lg font-medium">Description</h2>
                <p className="mt-1 text-sm text-gray-600">
                    This section provides a detailed description of the voucher
                    request.
                </p>
                <div className="flex gap-3 justify-end items-end">
                    <FileUploadSection />
                    <StatusUpdateSection />
                </div>
            </div>

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="px-4 py-6 sm:px-6 flex justify-between">
                    <div className="items-start">
                        <h3 className="text-base font-semibold text-gray-900">
                            Voucher Request Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Voucher Request details and application.
                        </p>
                    </div>
                    {user?.department == "Accounting Department" &&
                        not_completed &&
                        filtered.length == 4 && (
                            <div className="flex gap-3 justify-end items-end">
                                {/* Add your FileUploadButton and StatusUpdateButton components here */}
                                {/* <FileUploadButton /> */}
                                {/* <StatusUpdateButton /> */}
                            </div>
                        )}
                </div>

                <div className="border-t border-gray-100">
                    <dl className="divide-y divide-gray-100">
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Voucher Request No.
                            </dt>
                            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                                {voucher_request.request_no}
                            </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Full Name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                                {voucher_request?.requestor?.name}
                            </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Department
                            </dt>
                            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                                {voucher_request.department}
                            </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Category
                            </dt>
                            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                                {voucher_request.categories}
                            </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Amount
                            </dt>
                            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                                {peso_value(voucher_request.amount)}
                            </dd>
                        </div>
                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Purpose
                            </dt>
                            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                                {voucher_request.purpose}
                            </dd>
                        </div>

                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-900">
                                Date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                                {moment(voucher_request.date).format("LL")}
                            </dd>
                        </div>
                    </dl>

                    <div className="border-t border-gray-200" />
                    <div className="overflow-x-auto"></div>
                </div>
            </div>
        </>
    );
}
