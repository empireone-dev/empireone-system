import axios from "axios";

export function create_accounting_purchase_request_service(data) {
    try {
        const result = axios.post("/api/accounting_purchase_request", data);
        return result;
    } catch (error) {}
}

export async function get_accounting_purchase_request_service() {
    try {
        const result = axios.get("/api/accounting_purchase_request"+window.location.search);
        return result;
    } catch (error) {}
}

export async function get_accounting_purchase_request_by_id_service(id) {
    const res = await axios.get(
        "/api/accounting_purchase_requests/" +id
    );
    return res;
}

export async function delete_accounting_purchase_request_service(id) {
    try {
        const result = axios.delete(`/api/accounting_purchase_requests/${id}`);
        return result;
    } catch (error) {}
}

export function update_accounting_purchase_request_service(data) {
    try {
        const result = axios.put(`/api/accounting_purchase_requests/${data.id}`, data);
        return result;
    } catch (error) {}
}
