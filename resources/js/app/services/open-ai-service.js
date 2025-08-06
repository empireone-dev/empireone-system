import axios from "axios"


export async function scan_receipt_service(receipt) {
    try {
        const result =await axios.post('/api/scan_receipt', receipt)
      
        return result
    } catch (error) {

    }
}

export async function ticketing_prompt_stats_service(prompt) {
    try {
        const result =await axios.post('/api/ticketing_prompt_stats', { prompt })
      
        return result
    } catch (error) {

    }
}


export async function cocd_prompt_service(prompt) {
    try {
        const result =await axios.post('/api/cocd_prompt', { prompt })
      
        return result
    } catch (error) {

    }
}

