export default function DescriptionSection() {
    // Dummy data (replace later with backend API response)

    const requestInfo = {
        request_no: "PR#-091825-012142-01",
        requestor_id: "Wacky D. Hojilla",
        department: "IT Department",
        date: "September 19, 2025",
    };

    const items = [
        {
            unit: "PC",
            description: "High-performance PC for development",
            quantity: 2,
            unit_cost: 100,
            total_cost: 200,
        },
        {
            unit: "System Unit",
            description: "Custom-built system unit for office use",
            quantity: 2,
            unit_cost: 100,
            total_cost: 200,
        },
        {
            unit: "Lan Cable",
            description: "Cat6 Ethernet cable 10m",
            quantity: 1,
            unit_cost: 1000,
            total_cost: 1000,
        },
        {
            unit: "Keyboard",
            description: "Mechanical keyboard",
            quantity: 20,
            unit_cost: 50,
            total_cost: 1000,
        },
    ];

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

            <div className="border-t border-gray-100">
                <dl className="divide-y divide-gray-100">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Purchase Request No.
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {requestInfo.request_no}
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Full Name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {requestInfo.requestor_id}
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Department
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {requestInfo.department}
                        </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-900">
                            Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                            {requestInfo.date}
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
                            {items.map((item, index) => (
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
                                        ${item.unit_cost.toLocaleString()}
                                    </td>
                                    <td className="px-3 py-2 border">
                                        ${item.total_cost.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
