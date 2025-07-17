import axios from "axios"


export async function get_tickets_by_user_service() {
    const res = await axios.get('/api/get_tickets_by_user')
    return res
}

export async function get_tickets_by_internal_service() {
    const res = await axios.get('/api/get_tickets_by_internal'+window.location.search)
    return res
}


export function create_tickets_service(data) {
    try {
        const result = axios.post('/api/tickets', data)
        return result
    } catch (error) {

    }
}

export function get_tickets_service() {
    const queryString = window.location.search;
    const hasQuery = queryString.includes("?");
    const separator = hasQuery ? "&" : "?";
    const ticketing_location = window.location.pathname.split('/')[3] == "carcar"?"Carcar":"San Carlos";
    try {
        const result = axios.get(`/api/tickets${queryString}${separator}location=${ticketing_location}`)
        return result
    } catch (error) {

    }
}

export async function get_tickets_by_id_service(id) {
    const res = await axios.get('/api/tickets/' + id)
    return res.data
}

export function delete_tickets_service(id) {
    try {
        const result = axios.delete(`/api/tickets/${id}`)
        return result
    } catch (error) {

    }
}

export function update_tickets_service(data) {
    try {
        const result = axios.put(`/api/tickets/${data.id}`, data)
        return result
    } catch (error) {

    }
}