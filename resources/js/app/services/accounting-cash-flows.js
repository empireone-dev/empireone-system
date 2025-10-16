import axios from "axios";

export async function get_accounting_cash_flows_service() {
    try {
        const result = await axios.get("/api/accounting_cash_flows");
        return result;
    } catch (error) {}
}

export function update_accounting_cash_flows_service(data) {
    try {
        const result = axios.put(`/api/accounting_cash_flows/${data.id}`, data);
        return result;
    } catch (error) {}
}
