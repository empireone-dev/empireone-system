import React, { useState } from "react";
import { Upload, message } from "antd";
import Input from "@/app/_components/input";
import Wysiwyg from "@/app/_components/wysiwyg";
import { InboxOutlined } from "@ant-design/icons";
import Button from "@/app/_components/button";
import axios from "axios";
import { useSelector } from "react-redux";
import { submit_incident_report_response_data_service } from "@/app/services/hr-incident-report-service";

const { Dragger } = Upload;

export default function FormSection() {
    const { incident_report } = useSelector((store) => store.hr);
    console.log("incident_report", incident_report);
    const [formData, setFormData] = useState({
        employee_name: incident_report?.violator || "",
        employee_email: incident_report?.employee_email || "",
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
            const isValidSize = file.size / 1024 / 1024 < 5;
            if (!isValidSize) {
                message.error("File must be smaller than 5MB!");
                return false;
            }
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

            await submit_incident_report_response_data_service(data);

            setSubmitted(true);
            message.success("Your response has been submitted successfully!");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Failed to submit response. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="px-6 py-12 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Response Submitted Successfully!
                </h3>
                <p className="text-gray-600">
                    Thank you for submitting your explanation. HR will review
                    your response.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6">
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4">
                    <p className="text-sm text-red-700">{error}</p>
                </div>
            )}

            <div className="grid grid-cols-2 gap-4">
                <Input
                    label="Violator *"
                    type="text"
                    value={incident_report.violator}
                    // onChange={(e) =>
                    //     setFormData((prev) => ({
                    //         ...prev,
                    //         employee_name: e.target.value,
                    //     }))
                    // }
                    disabled
                    placeholder="Juan Dela Cruz"
                    required
                />
                <Input
                    disabled
                    label="Your Email Address *"
                    type="email"
                    value={incident_report.email}
                    // onChange={(e) =>
                    //     setFormData((prev) => ({
                    //         ...prev,
                    //         employee_email: e.target.value,
                    //     }))
                    // }
                    placeholder="juan.delacruz@empireonegroup.com"
                    required
                />
            </div>

            <Wysiwyg
                label="Your Written Explanation * (Minimum 50 characters)"
                name="explanation"
                value={incident_report.explanation}
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
