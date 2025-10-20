import axios from "axios";

export async function get_incident_report_service() {
    try {
        const result = await axios.get("/api/incident_report");
        return result;
    } catch (error) {}
}

export function update_incident_report_service(data) {
    try {
        const result = axios.put(`/api/incident_report/${data.id}`, data);
        return result;
    } catch (error) {}
}

export function create_incident_report_service(data) {
    try {
        const result = axios.post(`/api/incident_report`, data);
        return result;
    } catch (error) {}
}


export async function get_incident_report_by_id_service(id) {
    const res = await axios.get('/api/incident_report/' + id)
    return res.data
}