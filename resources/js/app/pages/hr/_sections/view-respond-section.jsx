import { ArrowLeftIcon, PrinterIcon } from "@heroicons/react/24/outline";

export default function ViewRespondSection({ incident_report, log, explanation }) {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Employee Response - IR #{incident_report.id}
                        </h1>
                        <p className="text-blue-100">
                            Submitted response regarding the incident report
                        </p>
                    </div>

                    {/* Incident Details */}
                    <div className="px-6 py-6 bg-gray-50 border-b">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Incident Details</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">IR Number</p>
                                <p className="font-medium text-gray-900">#{incident_report.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Employee Name</p>
                                <p className="font-medium text-gray-900">{incident_report.violator}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Incident Date</p>
                                <p className="font-medium text-gray-900">{incident_report.date}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Infraction</p>
                                <p className="font-medium text-gray-900">{incident_report.infraction}</p>
                            </div>
                        </div>
                    </div>

                    {/* Response Details */}
                    <div className="px-6 py-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Response Details</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Submitted By:</p>
                                <p className="text-gray-900">{log.user}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Submission Date:</p>
                                <p className="text-gray-900">{new Date(log.created_at).toLocaleString()}</p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-2">Written Explanation:</p>
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">{explanation}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="px-6 py-4 bg-gray-50 border-t flex justify-between items-center">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Back to IR
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <PrinterIcon className="w-4 h-4" />
                            Print Response
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}