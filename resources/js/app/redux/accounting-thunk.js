import { get_accounting_cash_flows_service } from "../services/accounting-cash-flows";
import { get_accounting_expenses_service, get_daily_expenses_service, get_expenses_report_service, get_my_fund_request_service } from "../services/accounting-expenses-service";
import { get_accounting_purchase_request_by_id_service, get_accounting_purchase_request_service } from "../services/accounting-purchase-request";
import { accountingSlice } from "./accounting-slice";

export function get_accounting_cash_flows_thunk() {
    return async function (dispatch, getState) {
        const res = await get_accounting_cash_flows_service();
        dispatch(accountingSlice.actions.setCashFlow(res.data));
    };
}

export function get_expenses_report_thunk() {
    return async function (dispatch, getState) {
        const res = await get_expenses_report_service();
        dispatch(accountingSlice.actions.setExpensesReports(res.data));
    };
}


export function get_accounting_expenses_thunk(data) {
    return async function (dispatch, getState) {
        const res = await get_accounting_expenses_service(data);
        dispatch(accountingSlice.actions.setExpenses(res.data));
    };
}
export function get_daily_expenses_thunk() {
    return async function (dispatch, getState) {
        const res = await get_daily_expenses_service();
        dispatch(accountingSlice.actions.setDailyExpenses(res.data));
    };
}



export function get_my_fund_request_thunk() {
    return async function (dispatch, getState) {
        const res = await get_my_fund_request_service();
        dispatch(accountingSlice.actions.setExpenses(res.data));
    };
}
export function get_purchase_request_thunk() {
    return async function (dispatch, getState) {
        const res = await get_accounting_purchase_request_service();
        dispatch(accountingSlice.actions.setPurchaseRequests(res.data));
    };
}

export function get_purchase_request_by_id_thunk(id) {
    return async function (dispatch, getState) {
        const res = await get_accounting_purchase_request_by_id_service(id);
        dispatch(accountingSlice.actions.setPurchaseRequest(res.data));
    };
}



