import { get_accounting_cash_flows_service } from "../services/accounting-cash-flows";
import { get_accounting_expenses_service, get_my_fund_request_service } from "../services/accounting-expenses-service";
import { accountingSlice } from "./accounting-slice";

export function get_accounting_cash_flows_thunk() {
    return async function (dispatch, getState) {
        const res = await get_accounting_cash_flows_service();
        dispatch(accountingSlice.actions.setCashFlow(res.data));
    };
}


export function get_accounting_expenses_thunk(data) {
    return async function (dispatch, getState) {
        const res = await get_accounting_expenses_service(data);
        dispatch(accountingSlice.actions.setExpenses(res.data));
    };
}


export function get_my_fund_request_thunk() {
    return async function (dispatch, getState) {
        const res = await get_my_fund_request_service();
        dispatch(accountingSlice.actions.setExpenses(res.data));
    };
}


