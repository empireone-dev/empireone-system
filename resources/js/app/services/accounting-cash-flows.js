import axios from "axios"

export async function get_accounting_cash_flows_service() {
    try {
        const result =await axios.get('/api/accounting_cash_flows')    
        return result
    } catch (error) {

    }
}