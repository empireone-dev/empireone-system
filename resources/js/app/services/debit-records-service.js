import axios from "axios";

export async function get_debit_records_service() {
    try {
        const result = await axios.get("/api/debit_records");
        return result;
    } catch (error) {}
}

export function update_debit_records_service(data) {
    try {
        const result = axios.put(`/api/debit_records/${data.id}`, data);
        return result;
    } catch (error) {}
}

export function create_debit_records_service(data) {
    try {
        const result = axios.post(`/api/debit_records`, data);
        return result;
    } catch (error) {}
}
