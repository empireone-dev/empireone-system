import axios from "axios"


export async function accounting_expenses_service(data) {
    try {
        const result =await axios.post('/api/accounting_expenses', data)    
        return result
    } catch (error) {

    }
}


export async function get_accounting_expenses_service() {
    try {
        const result =await axios.get('/api/accounting_expenses')    
        return result
    } catch (error) {

    }
}
