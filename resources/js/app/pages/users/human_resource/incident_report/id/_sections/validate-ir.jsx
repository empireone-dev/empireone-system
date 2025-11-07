import { useState } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Modal from "@/app/_components/modal";
import Wysiwyg from "@/app/_components/wysiwyg";
import Button from "@/app/_components/button";
import SwalAlert from "@/app/_components/swal";
import store from "@/app/store/store";
import { validate_ir_thunk } from "@/app/redux/hr-thunk";

const { Dragger } = Upload;

export default function ValidateIRModal({ isOpen, onClose, irId }) {
    const [formData, setFormData] = useState({ notes: "", file: null });
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
        if (!formData.notes || formData.notes.trim() === "") {
            SwalAlert({ icon: "error", title: "Validation Error", text: "Please provide notes" });
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append('notes', formData.notes);
            if (formData.file) {
                data.append('nte_file', formData.file);
            }

            await store.dispatch(validate_ir_thunk(irId, data));
            SwalAlert({ icon: "success", title: "Success", text: "IR validated and NTE served successfully" });
            setFormData({ notes: "", file: null });
            onClose();
        } catch (error) {
            SwalAlert({ icon: "error", title: "Error", text: "Failed to validate IR" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            width="max-w-3xl"
            isOpen={isOpen}
            onClose={onClose}
            title="Validate IR & Serve NTE"
        >
            <div className="space-y-4">
                <Wysiwyg
                    label="Validation Details"
                    name="notes"
                    value={formData.notes}
                    onChange={(html) => setFormData(prev => ({ ...prev, notes: html }))}
                />
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload NTE Email/File (Optional)
                    </label>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to upload</p>
                        <p className="ant-upload-hint">PDF, DOC, DOCX, JPG, PNG (max 5MB)</p>
                    </Dragger>
                </div>

                <div className="flex gap-3 justify-end mt-4">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="success" onClick={handleSubmit} loading={loading}>
                        Validate & Serve NTE
                    </Button>
                </div>
            </div>
        </Modal>
    );
}