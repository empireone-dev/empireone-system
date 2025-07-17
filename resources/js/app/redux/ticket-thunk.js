import { create_tickets_service, get_tickets_by_id_service, get_tickets_by_internal_service, get_tickets_by_user_service, get_tickets_service, update_tickets_service } from "../services/tickets-service";
import { ticketsSlice } from "./ticket-slice";

export function get_tickets_by_internal_thunk() {
    return async function (dispatch, getState) {
        const res = await get_tickets_by_internal_service()
        dispatch(ticketsSlice.actions.setTickets(res.data));
    };
}

export function get_tickets_by_user_thunk() {
    return async function (dispatch, getState) {
        const res = await get_tickets_by_user_service()
        dispatch(ticketsSlice.actions.setTickets(res.data));
    };
}

export function get_tickets_thunk() {
    return async function (dispatch, getState) {
        const res = await get_tickets_service()
        dispatch(ticketsSlice.actions.setTickets(res.data));
    };
}


export function create_tickets_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_tickets_service(data)
    };
}

export function get_tickets_by_id_thunk(id) {
    return async function (dispatch, getState) {
        const res = await get_tickets_by_id_service(id)
        dispatch(ticketsSlice.actions.setTicket(res));
    };
}


export function delete_tickets_thunk(id) {
    return async function (dispatch, getState) {
    };
}


export function update_tickets_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_tickets_service(data)
    };
}

export function update_ticketss_thunk(data) {
    return async function (dispatch, getState) {
    };
}