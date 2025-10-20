import { get_incident_report_by_id_service, get_incident_report_service } from "../services/hr-incident-report-service";
import { hrSlice } from "./hr-slice";


export function incident_report_thunk() {
    return async function (dispatch, getState) {
        const res = await get_incident_report_service()
        dispatch(hrSlice.actions.setIrs(res.data));
    };
}


export function incident_report_by_id_thunk(id) {
    return async function (dispatch, getState) {
        const res = await get_incident_report_by_id_service(id)
        dispatch(hrSlice.actions.setIr(res));
    };
}
