import Button from "@/app/_components/button";
import { peso_value } from "@/app/lib/peso-value";
import moment from "moment";
import { useSelector } from "react-redux";
import FileUploadButton from "./file-upload-button";
import StatusUpdateButton from "./status-update-button";

export default function DescriptionSection() {
    const { purchase_request } = useSelector((store) => store.accounting);
    console.log("purchase_request", purchase_request);

    const grand_total_cost = purchase_request?.items?.reduce(
        (sum, item) => sum + Number(item.total_cost),
        0
    );
    return (
        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="px-4 py-6 sm:px-6">
                <h3 className="text-base font-semibold text-gray-900">
                    Purchase Request Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Purchase Request details and application.
                </p>
            </div>
            <div className="flex gap-3 justify-end">
                
                <FileUploadButton/>
                <StatusUpdateButton/>
            
            </div>

            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Purchase Request No.
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {purchase_request.request_no}
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Full Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {purchase_request?.requestor?.name}
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Department
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {purchase_request.department}
                        </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Category
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {purchase_request.categories}
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {moment(purchase_request.date).format("LL")}
                        </dd>
                    </div>
                </dl>

                <div className="border-t border-gray-200" />

                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border border-gray-200 text-sm text-left text-gray-700">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-3 py-2 border">Unit</th>
                                <th className="px-3 py-2 border">
                                    Description
                                </th>
                                <th className="px-3 py-2 border">Quantity</th>
                                <th className="px-3 py-2 border">Unit Cost</th>
                                <th className="px-3 py-2 border">Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchase_request?.items?.map((item, index) => (
                                <tr key={index}>
                                    <td className="px-3 py-2 border">
                                        {item.unit}
                                    </td>
                                    <td className="px-3 py-2 border break-words">
                                        {item.description}
                                    </td>
                                    <td className="px-3 py-2 border">
                                        {item.quantity}
                                    </td>
                                    <td className="px-3 py-2 border">
                                        {peso_value(item.unit_cost)}
                                    </td>
                                    <td className="px-3 py-2 border">
                                        {peso_value(item.total_cost)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                        {/* ✅ Overall Total row */}
                        <tfoot className="bg-gray-50 font-bold">
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-3 py-2 border text-right"
                                >
                                    Overall:
                                </td>
                                <td className="px-3 py-2 border">
                                    {peso_value(grand_total_cost)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}
