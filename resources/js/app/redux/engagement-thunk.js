import { get_engagement_activities_by_id_service, get_engagement_activities_service } from "../services/engagement-activities-service";
import { get_engagement_calendar_by_id_service, get_engagement_calendar_service } from "../services/engagement-calendar-service";
import { engagementSlice } from "./engagement-slice";


export function get_engagement_activities_thunk() {
    return async function (dispatch, getState) {
        const res = await get_engagement_activities_service()
        dispatch(engagementSlice.actions.setActivities(res.data));
    };
}



export function get_engagement_activities_by_id_thunk(id) {
    return async function (dispatch, getState) {
        const res = await get_engagement_activities_by_id_service(id)
        dispatch(engagementSlice.actions.setActivity(res));
    };
}


export function get_engagement_calendar_thunk() {
    return async function (dispatch, getState) {
        const res = await get_engagement_calendar_service()
        dispatch(engagementSlice.actions.setCalendars(res.data));
    };
}



export function get_engagement_calendar_by_id_thunk(id) {
    return async function (dispatch, getState) {
        const res = await get_engagement_calendar_by_id_service(id)
        dispatch(engagementSlice.actions.setCalendar(res));
    };
}
