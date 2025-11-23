import { useState } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Modal from "@/app/_components/modal";
import Button from "@/app/_components/button";
import SwalAlert from "@/app/_components/swal";
import store from "@/app/store/store";
import { upload_nod_thunk } from "@/app/redux/hr-thunk";
import Wysiwyg from "@/app/_components/wysiwyg";

const { Dragger } = Upload;

export default function UploadNODModal({ isOpen, onClose, irId }) {
    const [formData, setFormData] = useState({ notes: "", file: null, sanction: "" });
    const [loading, setLoading] = useState(false);

    const uploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        accept: '.pdf,.doc,.docx',
        beforeUpload: (file) => {
            // Store the raw File object
            setFormData(prev => ({ ...prev, file }));
            return false; // Prevent automatic upload
        },
        onRemove: () => {
            setFormData(prev => ({ ...prev, file: null }));
        }
    };

    const handleSubmit = async () => {
        // Validate required fields
        if (!formData.file) {
            SwalAlert({ icon: "error", title: "Validation Error", text: "Please upload NOD file" });
            return;
        }
        
        if (!formData.sanction || formData.sanction === "") {
            SwalAlert({ icon: "error", title: "Validation Error", text: "Please select a sanction" });
            return;
        }

        setLoading(true);
        try {
            const data = new FormData();
            
            // Get the raw file - Ant Design wraps it in an object with originFileObj
            const fileToUpload = formData.file.originFileObj || formData.file;
            
            // Validate file type
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(fileToUpload.type)) {
                SwalAlert({ 
                    icon: "error", 
                    title: "Invalid File Type", 
                    text: "Please upload a PDF, DOC, or DOCX file" 
                });
                setLoading(false);
                return;
            }

            data.append('nod_file', fileToUpload);
            data.append('sanction', formData.sanction);
            if (formData.notes && formData.notes.trim() !== "") {
                data.append('notes', formData.notes);
            }

            await store.dispatch(upload_nod_thunk(irId, data));
            SwalAlert({ icon: "success", title: "Success", text: "NOD uploaded and case closed successfully" });
            setFormData({ notes: "", file: null, sanction: "" });
            onClose();
        } catch (error) {
            console.error('Upload NOD error:', error);
            console.error('Error response:', error.response?.data);
            
            // Check for Laravel validation errors
            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat();
                SwalAlert({ 
                    icon: "error", 
                    title: "Validation Error", 
                    text: errors.join(', ') 
                });
            } else {
                const errorMsg = error.response?.data?.message || "Failed to upload NOD";
                SwalAlert({ icon: "error", title: "Error", text: errorMsg });
            }
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
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sanction <span className="text-red-500">*</span>
                    </label>
                    <select
                        value={formData.sanction}
                        onChange={(e) => setFormData(prev => ({ ...prev, sanction: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select sanction</option>
                        <option value="Verbal Warning">Verbal Warning</option>
                        <option value="Written Warning">Written Warning</option>
                        <option value="Memo">Memo</option>
                        <option value="Suspension">Suspension</option>
                        <option value="Termination">Termination</option>
                        <option value="No Sanction">No Sanction</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        NOD File <span className="text-red-500">*</span>
                    </label>
                    <Dragger {...uploadProps}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag NOD file to upload</p>
                        <p className="ant-upload-hint">PDF, DOC, or DOCX (max 5MB)</p>
                    </Dragger>
                </div>

                <Wysiwyg
                    label="Additional Notes (Optional)"
                    name="notes"
                    value={formData.notes}
                    onChange={(html) => setFormData(prev => ({ ...prev, notes: html }))}
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