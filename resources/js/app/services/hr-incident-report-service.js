import axios from "axios";

export async function submit_incident_report_response_data_service(data) {
    const id = window.location.pathname.split("/")[3];
    try {
        const res = await axios.post(
            `/api/hr/incident-report/${id}/submit-response`,
            data,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        return res.data;
    } catch (error) {
        throw error;
    }
}
export async function get_incident_report_response_data_service() {
    try {
        const pathParts = window.location.pathname.split("/");
        const id = pathParts[pathParts.length - 2];
        const queryString = window.location.search;
        const res = await axios.get(
            `/api/hr/incident-report/${id}/respond-data${queryString}`
        );
        return res.data;
    } catch (error) {
        throw error;
    }
}

export async function get_incident_report_service() {
    try {
        const result = await axios.get("/api/incident_report");
        return result;
    } catch (error) {
        throw error;
    }
}

export function update_incident_report_service(data) {
    try {
        const result = axios.put(`/api/incident_report/${data.id}`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export function create_incident_report_service(data) {
    try {
        const result = axios.post(`/api/incident_report`, data);
        return result;
    } catch (error) {
        throw error;
    }
}

export async function get_incident_report_by_id_service(id) {
    const res = await axios.get("/api/hr/incident-reports/" + id);
    return res.data;
}

export async function validate_ir_service(id, data) {
    const res = await axios.post(
        `/api/hr/incident-reports/${id}/validate`,
        data,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return res.data;
}

export async function invalidate_ir_service(id, data) {
    const res = await axios.post(
        `/api/hr/incident-reports/${id}/invalidate`,
        data,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return res.data;
}

export async function upload_employee_response_service(id, data) {
    const res = await axios.post(
        `/api/hr/incident-reports/${id}/employee-response`,
        data,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return res.data;
}

export async function schedule_hearing_service(id, data) {
    const res = await axios.post(
        `/api/hr/incident-reports/${id}/schedule-hearing`,
        data,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return res.data;
}

export async function upload_nod_service(id, data) {
    const res = await axios.post(
        `/api/hr/incident-reports/${id}/upload-nod`,
        data,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return res.data;
}

export async function get_employee_response_form_service(id, signature) {
    const res = await axios.get(
        `/hr/incident-report/${id}/respond?${signature}`
    );
    return res.data;
}

export async function submit_employee_response_service(id, data, signature) {
    const res = await axios.post(
        `/hr/incident-report/${id}/submit-response?${signature}`,
        data,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );
    return res.data;
}
