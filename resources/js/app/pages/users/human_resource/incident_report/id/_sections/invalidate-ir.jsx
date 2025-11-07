import { useState } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Modal from "@/app/_components/modal";
import Wysiwyg from "@/app/_components/wysiwyg";
import Button from "@/app/_components/button";
import SwalAlert from "@/app/_components/swal";
import store from "@/app/store/store";
import { invalidate_ir_thunk } from "@/app/redux/hr-thunk";

const { Dragger } = Upload;

export default function InvalidateIRModal({ isOpen, onClose, irId }) {
    const [formData, setFormData] = useState({ reason: "", file: null });
    const [loading, setLoading] = useState(false);

    const uploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        beforeUpload: (file) => {
            setFormData(prev => ({ ...prev, file }));
            return false;
        },
        onRemove: () => {
            setFormData(prev => ({ ...prev, file: null }));
        }
    };

    const handleSubmit = async () => {
        if (!formData.reason || formData.reason.trim() === "") {
            SwalAlert({ icon: "error", title: "Validation Error", text: "Please provide a reason" });
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append('reason', formData.reason);
            if (formData.file) {
                data.append('closure_file', formData.file);
            }

            await store.dispatch(invalidate_ir_thunk(irId, data));
            SwalAlert({ icon: "success", title: "Success", text: "IR marked as invalid and closed" });
            setFormData({ reason: "", file: null });
            onClose();
        } catch (error) {
            SwalAlert({ icon: "error", title: "Error", text: "Failed to invalidate IR" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            width="max-w-3xl"
            isOpen={isOpen}
            onClose={onClose}
            title="Mark IR as Invalid"
        >
            <div className="space-y-4">
                <Wysiwyg
                    label="Reason for Invalidation"
                    name="reason"
                    value={formData.reason}
                    onChange={(html) => setFormData(prev => ({ ...prev, reason: html }))}
                />
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Closure Documentation (Optional)
                    </label>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to upload</p>
                        <p className="ant-upload-hint">PDF, DOC, DOCX (max 5MB)</p>
                    </Dragger>
                </div>

                <div className="flex gap-3 justify-end mt-4">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="danger" onClick={handleSubmit} loading={loading}>
                        Mark as Invalid
                    </Button>
                </div>
            </div>
        </Modal>
    );
}