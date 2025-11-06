import { useState } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Modal from "@/app/_components/modal";
import TextArea from "@/app/_components/textarea";
import Select from "@/app/_components/select";
import Button from "@/app/_components/button";
import SwalAlert from "@/app/_components/swal";
import store from "@/app/store/store";
import { upload_nod_thunk } from "@/app/redux/hr-thunk";

const { Dragger } = Upload;

export default function UploadNODModal({ isOpen, onClose, irId }) {
    const [formData, setFormData] = useState({ notes: "", file: null, sanction: "" });
    const [loading, setLoading] = useState(false);

    const sanctionOptions = [
        { value: "Verbal Warning", label: "Verbal Warning" },
        { value: "Written Warning", label: "Written Warning" },
        { value: "Memo", label: "Memo" },
        { value: "Suspension", label: "Suspension" },
        { value: "Termination", label: "Termination" },
        { value: "No Sanction", label: "No Sanction" }
    ];

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
        if (!formData.file || !formData.sanction) {
            SwalAlert({ icon: "error", title: "Validation Error", text: "Please upload NOD file and specify sanction" });
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            data.append('nod_file', formData.file);
            data.append('sanction', formData.sanction);
            if (formData.notes) {
                data.append('notes', formData.notes);
            }

            await store.dispatch(upload_nod_thunk(irId, data));
            SwalAlert({ icon: "success", title: "Success", text: "NOD uploaded and case closed successfully" });
            setFormData({ notes: "", file: null, sanction: "" });
            onClose();
        } catch (error) {
            SwalAlert({ icon: "error", title: "Error", text: "Failed to upload NOD" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            width="max-w-lg"
            isOpen={isOpen}
            onClose={onClose}
            title="Upload NOD & Close Case"
        >
            <div className="space-y-4">
                <Select
                    label="Sanction *"
                    name="sanction"
                    options={sanctionOptions}
                    value={formData.sanction}
                    onChange={(e) => setFormData(prev => ({ ...prev, sanction: e.target.value }))}
                />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        NOD File *
                    </label>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag NOD file to upload</p>
                    </Dragger>
                </div>

                <TextArea
                    label="Additional Notes (Optional)"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Enter final notes"
                />

                <div className="flex gap-3 justify-end mt-4">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button variant="primary" onClick={handleSubmit} loading={loading}>
                        Upload NOD & Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
}