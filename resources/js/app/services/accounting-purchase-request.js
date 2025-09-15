<<<<<<< HEAD
import axios from "axios"


export async function create_accounting_purchase_request_service(data) {
    try {
        const result =await axios.post('/api/accounting_purchase_requests', data)    
        return result
    } catch (error) {

    }
}

// export async function request_change_status_service(data) {
//     try {
//         const result =await axios.post('/api/request_change_status', data)    
//         return result
//     } catch (error) {

//     }
// }

// export async function get_my_fund_request_service() {
//     try {
//         const result =await axios.get('/api/my_fund_request')    
//         return result
//     } catch (error) {

//     }
// }

// export async function get_fund_pending_request_service() {
//     try {
//         const result =await axios.get('/api/get_fund_pending_request')    
//         return result
//     } catch (error) {

//     }
// }


// export async function get_accounting_expenses_service(data) {
//     try {
//         const result =await axios.get('/api/accounting_expenses?status='+data.status)    
//         return result
//     } catch (error) {

//     }
// }

// export async function get_daily_expenses_service() {
//     try {
//         const result =await axios.get('/api/get_daily_expenses')    
//         return result
//     } catch (error) {

//     }
// }

// export async function get_expenses_report_service() {
//     try {
//         const result =await axios.get('/api/get_expenses_report'+window.location.search)    
//         return result
//     } catch (error) {

//     }
// }

=======
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
        "/api/accounting_purchase_request/" +id
    );
    return res;
}

export async function delete_accounting_purchase_request_service(id) {
    try {
        const result = axios.delete(`/api/accounting_purchase_request/${id}`);
        return result;
    } catch (error) {}
}

export function update_accounting_purchase_request_service(data) {
    try {
        const result = axios.put(`/api/accounting_purchase_request/${data.id}`, data);
        return result;
    } catch (error) {}
}
>>>>>>> a1ff6f28 ( Purchase Request Data Implemented)
