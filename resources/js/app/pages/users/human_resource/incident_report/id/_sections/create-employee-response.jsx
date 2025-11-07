import { useState } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Modal from "@/app/_components/modal";
import TextArea from "@/app/_components/textarea";
import Button from "@/app/_components/button";
import SwalAlert from "@/app/_components/swal";
import store from "@/app/store/store";
import { upload_employee_response_thunk } from "@/app/redux/hr-thunk";
import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";

const { Dragger } = Upload;

export default function EmployeeResponseModal({ irId }) {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const [formData, setFormData] = useState({ notes: "", file: null });
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async () => {
        if (!formData.file) {
            SwalAlert({
                icon: "error",
                title: "Validation Error",
                text: "Please upload employee response file",
            });
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append("response_file", formData.file);
            if (formData.notes) {
                data.append("notes", formData.notes);
            }

            await store.dispatch(upload_employee_response_thunk(irId, data));
            SwalAlert({
                icon: "success",
                title: "Success",
                text: "Employee response uploaded successfully",
            });
            setFormData({ notes: "", file: null });
            onClose();
        } catch (error) {
            SwalAlert({
                icon: "error",
                title: "Error",
                text: "Failed to upload employee response",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                <DocumentArrowUpIcon className="w-5 h-5" />
                Upload Employee Response
            </button>
            <Modal
                width="max-w-lg"
                isOpen={isOpen}
                onClose={onClose}
                title="Upload Employee Response"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Employee Response File *
                        </label>
                        <Dragger {...uploadProps}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">
                                Click or drag file to upload
                            </p>
                        </Dragger>
                    </div>

                    <TextArea
                        label="Additional Notes (Optional)"
                        rows={3}
                        value={formData.notes}
                        onChange={(e) =>
                            setFormData((prev) => ({
                                ...prev,
                                notes: e.target.value,
                            }))
                        }
                        placeholder="Enter any additional notes"
                    />

                    <div className="flex gap-3 justify-end mt-4">
                        <Button variant="secondary" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            Upload Response
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
