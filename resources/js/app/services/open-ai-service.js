import axios from "axios"

export async function ticketing_prompt_stats_service(prompt) {
    try {
        const result =await axios.post('/api/ticketing_prompt_stats', { prompt })
      
        return result
    } catch (error) {

    }
}