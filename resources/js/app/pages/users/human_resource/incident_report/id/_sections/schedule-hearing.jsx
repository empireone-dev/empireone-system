import { useState } from "react";
import { Upload, DatePicker } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Modal from "@/app/_components/modal";
import Button from "@/app/_components/button";
import SwalAlert from "@/app/_components/swal";
import store from "@/app/store/store";
import { schedule_hearing_thunk } from "@/app/redux/hr-thunk";
import Wysiwyg from "@/app/_components/wysiwyg";

const { Dragger } = Upload;

export default function ScheduleHearingModal({ isOpen, onClose, irId }) {
    const [formData, setFormData] = useState({ notes: "", file: null, hearing_date: null });
    const [loading, setLoading] = useState(false);

    const uploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: '.pdf,.doc,.docx',
        beforeUpload: (file) => {
            setFormData(prev => ({ ...prev, file }));
            return false;
        },
        onRemove: () => {
            setFormData(prev => ({ ...prev, file: null }));
        }
    };

    const handleSubmit = async () => {
        if (!formData.hearing_date || !formData.notes) {
            SwalAlert({ icon: "error", title: "Validation Error", text: "Please provide hearing date and notes" });
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append('hearing_date', formData.hearing_date.format('YYYY-MM-DD'));
            data.append('notes', formData.notes);
            if (formData.file) {
                const fileToUpload = formData.file.originFileObj || formData.file;
                data.append('hearing_file', fileToUpload);
            }

            await store.dispatch(schedule_hearing_thunk(irId, data));
            SwalAlert({ icon: "success", title: "Success", text: "Hearing scheduled successfully" });
            setFormData({ notes: "", file: null, hearing_date: null });
            onClose();
        } catch (error) {
            SwalAlert({ icon: "error", title: "Error", text: "Failed to schedule hearing" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            width="max-w-lg"
            isOpen={isOpen}
            onClose={onClose}
            title="Schedule Hearing"
        >
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hearing Date *
                    </label>
                    <DatePicker
                        className="w-full"
                        value={formData.hearing_date}
                        onChange={(date) => setFormData(prev => ({ ...prev, hearing_date: date }))}
                    />
                </div>

                <Wysiwyg
                    label="Hearing Notes *"
                    name="notes"
                    value={formData.notes}
                    onChange={(html) => setFormData(prev => ({ ...prev, notes: html }))}
                    placeholder="Enter hearing details, panel members, location, etc."
                />
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Hearing Documents (Optional)
                    </label>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to upload</p>
                        <p className="ant-upload-hint">PDF, DOC, or DOCX (max 5MB)</p>
                    </Dragger>
                </div>

                <div className="flex gap-3 justify-end mt-4">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit} loading={loading}>
                        Schedule Hearing
                    </Button>
                </div>
            </div>
        </Modal>
    );
}