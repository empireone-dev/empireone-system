import React, { useState } from "react";
import { Upload } from "antd";
import Input from "@/app/_components/input";
import Wysiwyg from "@/app/_components/wysiwyg";
import { InboxOutlined } from "@ant-design/icons";
import Button from "@/app/_components/button";

const { Dragger } = Upload;
export default function FormSection() {
    const incident_report = {};
    const [formData, setFormData] = useState({
        employee_name: "", // Pre-fill with violator name
        employee_email: "", // Pre-fill if available
        explanation: "",
        file: null,
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
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
            const currentUrl =
                window.location.pathname.replace(
                    "/respond",
                    "/submit-response"
                ) + window.location.search;

            await axios.post(currentUrl, data, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setSubmitted(true);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Failed to submit response. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };
    return (
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
                        setFormData((prev) => ({
                            ...prev,
                            employee_name: e.target.value,
                        }))
                    }
                    placeholder="Juan Dela Cruz"
                    required
                />
                <Input
                    label="Your Email Address *"
                    type="email"
                    value={formData.employee_email}
                    onChange={(e) =>
                        setFormData((prev) => ({
                            ...prev,
                            employee_email: e.target.value,
                        }))
                    }
                    placeholder="juan.delacruz@empireonegroup.com"
                    required
                />
            </div>

            <Wysiwyg
                label="Your Written Explanation * (Minimum 50 characters)"
                name="explanation"
                value={formData.explanation}
                onChange={(html) =>
                    setFormData((prev) => ({
                        ...prev,
                        explanation: html,
                    }))
                }
            />

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supporting Documents (Optional)
                </label>
                <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Click or drag file to upload
                    </p>
                    <p className="ant-upload-hint">
                        PDF, DOC, DOCX, JPG, PNG (max 5MB)
                    </p>
                </Dragger>
            </div>

            <div className="flex gap-3 justify-end pt-4">
                <Button type="submit" variant="primary" loading={loading}>
                    Submit Response
                </Button>
            </div>
        </form>
    );
}
