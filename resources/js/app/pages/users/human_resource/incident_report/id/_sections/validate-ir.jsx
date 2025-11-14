import { useState } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Modal from "@/app/_components/modal";
import Wysiwyg from "@/app/_components/wysiwyg";
import Input from "@/app/_components/input";
import Button from "@/app/_components/button";
import SwalAlert from "@/app/_components/swal";
import store from "@/app/store/store";
import { validate_ir_thunk } from "@/app/redux/hr-thunk";

const { Dragger } = Upload;

export default function ValidateIRModal({ isOpen, onClose, irId }) {
    const [formData, setFormData] = useState({ 
        notes: "", 
        file: null, 
        employee_email: "",
        response_days: "5"
    });
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

        if (!formData.employee_email || !formData.employee_email.includes('@')) {
            SwalAlert({ icon: "error", title: "Validation Error", text: "Please enter a valid employee email address" });
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append('notes', formData.notes);
            data.append('employee_email', formData.employee_email);
            data.append('response_days', formData.response_days);
            if (formData.file) {
                data.append('nte_file', formData.file);
            }

            await store.dispatch(validate_ir_thunk(irId, data));
            SwalAlert({ 
                icon: "success", 
                title: "Success", 
                text: `IR validated and NTE email sent to ${formData.employee_email}` 
            });
            setFormData({ notes: "", file: null, employee_email: "", response_days: "5" });
            onClose();
        } catch (error) {
            SwalAlert({ icon: "error", title: "Error", text: "Failed to validate IR and send NTE" });
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
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p className="text-sm text-yellow-700">
                        <strong>Note:</strong> An email with the NTE will be automatically sent to the employee's email address.
                    </p>
                </div>

                <Input
                    label="Violator Email Address *"
                    type="email"
                    value={formData.employee_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, employee_email: e.target.value }))}
                    placeholder="employee@empireonegroup.com"
                    required
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Response Deadline (Business Days)"
                        type="number"
                        min="1"
                        max="30"
                        value={formData.response_days}
                        onChange={(e) => setFormData(prev => ({ ...prev, response_days: e.target.value }))}
                        placeholder="5"
                    />
                </div>

                <Wysiwyg
                    label="NTE Notes / Details *"
                    name="notes"
                    value={formData.notes}
                    onChange={(html) => setFormData(prev => ({ ...prev, notes: html }))}
                />
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload NTE Document (Optional)
                    </label>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag NTE file to upload</p>
                        <p className="ant-upload-hint">PDF, DOC, DOCX, JPG, PNG (max 5MB)</p>
                    </Dragger>
                </div>

                <div className="flex gap-3 justify-end mt-4">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="success" onClick={handleSubmit} loading={loading}>
                        Validate & Send NTE Email
                    </Button>
                </div>
            </div>
        </Modal>
    );
}