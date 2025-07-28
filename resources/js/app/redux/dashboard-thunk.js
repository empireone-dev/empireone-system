import { get_dashboard_by_id_service, get_dashboard_service } from "../services/dashboard-service";
import { dashboardsSlice } from "./dashboard-slice";

export function get_dashboard_thunk(department) {
    return async function (dispatch, getState) {
        const res = await get_dashboard_service(department)
        dispatch(dashboardsSlice.actions.setDashboard(res.data));
    };
}



export function get_dashboard_by_id_thunk(id) {
    return async function (dispatch, getState) {
        const res = await get_dashboard_by_id_service(id)
        dispatch(dashboardsSlice.actions.setDashboard(res));
    };
}
