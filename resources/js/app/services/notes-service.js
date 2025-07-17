export function create_notes_service(data) {
    try {
        const result = axios.post("/api/notes", data);
        return result;
    } catch (error) {}
}