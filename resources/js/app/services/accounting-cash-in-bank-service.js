import axios from "axios";

export async function get_cash_in_bank_service() {
    try {
        const result = await axios.get("/api/cash_in_bank");
        return result;
    } catch (error) {}
}

export function update_cash_in_bank_service(data) {
    try {
        const result = axios.put(`/api/cash_in_bank/${data.id}`, data);
        return result;
    } catch (error) {}
}
