import axios from "axios";

export function create_engagement_activities_service(data) {
    try {
        const result = axios.post("/api/engagement_activities", data);
        return result;
    } catch (error) {}
}

export function get_engagement_activities_service() {
    try {
        const result = axios.get("/api/engagement_activities");
        return result;
    } catch (error) {}
}

export async function get_engagement_activities_by_id_service(
    product_code,
    date
) {
    const res = await axios.get(
        "/api/engagement_activities/" + product_code + "?date=" + date
    );
    return res;
}

export function delete_engagement_activities_service(id) {
    try {
        const result = axios.delete(`/api/engagement_activities/${id}`);
        return result;
    } catch (error) {}
}

export function update_engagement_activities_service(data) {
    try {
        const result = axios.post(`/api/update_activity`, data);
        return result;
    } catch (error) {}
}
