import { 
    get_incident_report_by_id_service, 
    get_incident_report_service,
    validate_ir_service,
    invalidate_ir_service,
    upload_employee_response_service,
    schedule_hearing_service,
    upload_nod_service,
    get_incident_report_response_data_service
} from "../services/hr-incident-report-service";
import { hrSlice } from "./hr-slice";


export function get_incident_report_response_data_thunk() {
    return async function (dispatch, getState) {
        const res = await get_incident_report_response_data_service()
        dispatch(hrSlice.actions.setIncidentReport({
            ...res,
            ...res.incident_report
        }));
    };
}

export function incident_report_thunk() {
    return async function (dispatch, getState) {
        const res = await get_incident_report_service()
        dispatch(hrSlice.actions.setIrs(res.data));
    };
}


export function get_incident_report_by_id_thunk(id) {
    return async function (dispatch, getState) {
        const res = await get_incident_report_by_id_service(id)
        dispatch(hrSlice.actions.setIr(res));
    };
}


export function validate_ir_thunk(id, data) {
    return async function (dispatch, getState) {
        const res = await validate_ir_service(id, data);
        // Refresh the IR data
        await dispatch(get_incident_report_by_id_thunk(id));
        return res;
    };
}


export function invalidate_ir_thunk(id, data) {
    return async function (dispatch, getState) {
        const res = await invalidate_ir_service(id, data);
        await dispatch(get_incident_report_by_id_thunk(id));
        return res;
    };
}


export function upload_employee_response_thunk(id, data) {
    return async function (dispatch, getState) {
        const res = await upload_employee_response_service(id, data);
        await dispatch(get_incident_report_by_id_thunk(id));
        return res;
    };
}


export function schedule_hearing_thunk(id, data) {
    return async function (dispatch, getState) {
        const res = await schedule_hearing_service(id, data);
        await dispatch(get_incident_report_by_id_thunk(id));
        return res;
    };
}


export function upload_nod_thunk(id, data) {
    return async function (dispatch, getState) {
        const res = await upload_nod_service(id, data);
        await dispatch(get_incident_report_by_id_thunk(id));
        return res;
    };
}
