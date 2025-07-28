import axios from "axios"

export function get_dashboard_service(department) {
    try {
        const result = axios.get('/api/dashboard?'+ new URLSearchParams(department).toString())
        return result
    } catch (error) {

    }
}

export async function get_dashboard_by_id_service(id) {
    const res = await axios.get('/api/dashboard/' + id)
    return res.data
}

