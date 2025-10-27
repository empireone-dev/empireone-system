import axios from "axios";

export function create_engagement_calendar_service(data) {
    try {
        const result = axios.post("/api/engagement_calendar", data);
        return result;
    } catch (error) {}
}

export function get_engagement_calendar_service() {
    try {
        const result = axios.get("/api/engagement_calendar");
        return result;
    } catch (error) {}
}

export async function get_engagement_calendar_by_id_service(product_code, date) {
    const res = await axios.get(
        "/api/engagement_calendar/" + product_code + "?date=" + date
    );
    return res;
}

export function delete_engagement_calendar_service(id) {
    try {
        const result = axios.delete(`/api/engagement_calendar/${id}`);
        return result;
    } catch (error) {}
}

export function update_engagement_calendar_service(data) {
    try {
        const result = axios.put(`/api/engagement_calendar/${data.id}`, data);
        return result;
    } catch (error) {}
}
