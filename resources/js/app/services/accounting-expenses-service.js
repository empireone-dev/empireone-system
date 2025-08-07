import axios from "axios"


export async function accounting_expenses_service(data) {
    try {
        const result =await axios.post('/api/accounting_expenses', data)    
        return result
    } catch (error) {

    }
}

export async function request_change_status_service(data) {
    try {
        const result =await axios.post('/api/request_change_status', data)    
        return result
    } catch (error) {

    }
}

export async function get_my_fund_request_service() {
    try {
        const result =await axios.get('/api/my_fund_request')    
        return result
    } catch (error) {

    }
}

export async function get_fund_pending_request_service() {
    try {
        const result =await axios.get('/api/get_fund_pending_request')    
        return result
    } catch (error) {

    }
}


export async function get_accounting_expenses_service(data) {
    try {
        const result =await axios.get('/api/accounting_expenses?status='+data.status)    
        return result
    } catch (error) {

    }
}
