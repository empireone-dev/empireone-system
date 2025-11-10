import { useState } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Wysiwyg from "@/app/_components/wysiwyg";
import Input from "@/app/_components/input";
import Button from "@/app/_components/button";
import axios from "axios";

const { Dragger } = Upload;

export default function EmployeeResponsePage({ incident_report, has_responded }) {
    const [formData, setFormData] = useState({
        employee_name: "",
        employee_email: "",
        explanation: "",
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(has_responded);
    const [error, setError] = useState("");

    const uploadProps = {
        name: "file",
        multiple: false,
        maxCount: 1,
        beforeUpload: (file) => {
            setFormData((prev) => ({ ...prev, file }));
            return false;
        },
        onRemove: () => {
            setFormData((prev) => ({ ...prev, file: null }));
        },
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.employee_name || !formData.employee_email) {
            setError("Please fill in your name and email.");
            return;
        }

        if (!formData.explanation || formData.explanation.length < 50) {
            setError("Your explanation must be at least 50 characters.");
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append("employee_name", formData.employee_name);
            data.append("employee_email", formData.employee_email);
            data.append("explanation", formData.explanation);
            if (formData.file) {
                data.append("response_file", formData.file);
            }

            // Use current URL to preserve signature
            const currentUrl = window.location.pathname.replace('/respond', '/submit-response') + window.location.search;
            
            await axios.post(
                currentUrl,
                data,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setSubmitted(true);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit response. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
                    <div className="text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Response Submitted Successfully
                        </h2>
                        <p className="text-gray-600">
                            Thank you for submitting your explanation. The HR department will review your response.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Notice to Explain - Response Form
                        </h1>
                        <p className="text-red-100">
                            Please provide your written explanation regarding the incident report.
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

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-400 p-4">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <Input
                                label="Your Full Name *"
                                type="text"
                                value={formData.employee_name}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, employee_name: e.target.value }))
                                }
                                placeholder="Juan Dela Cruz"
                                required
                            />
                            <Input
                                label="Your Email Address *"
                                type="email"
                                value={formData.employee_email}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, employee_email: e.target.value }))
                                }
                                placeholder="juan.delacruz@empireonegroup.com"
                                required
                            />
                        </div>

                        <Wysiwyg
                            label="Your Written Explanation * (Minimum 50 characters)"
                            name="explanation"
                            value={formData.explanation}
                            onChange={(html) => setFormData((prev) => ({ ...prev, explanation: html }))}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Supporting Documents (Optional)
                            </label>
                            <Dragger {...uploadProps}>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag file to upload</p>
                                <p className="ant-upload-hint">PDF, DOC, DOCX, JPG, PNG (max 5MB)</p>
                            </Dragger>
                        </div>

                        <div className="flex gap-3 justify-end pt-4">
                            <Button type="submit" variant="primary" loading={loading}>
                                Submit Response
                            </Button>
                        </div>
                    </form>
                </div>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>If you have any questions, please contact HR at hr@empireonegroup.com</p>
                </div>
            </div>
        </div>
    );
}