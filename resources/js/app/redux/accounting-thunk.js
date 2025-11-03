import { get_accounting_cash_flows_service } from "../services/accounting-cash-flows";
import { get_cash_in_bank_service } from "../services/accounting-cash-in-bank-service";
import { get_accounting_expenses_service, get_daily_expenses_service, get_expenses_report_service, get_my_fund_request_service, get_petty_cash_service } from "../services/accounting-expenses-service";
import { get_accounting_purchase_request_by_id_service, get_accounting_purchase_request_service } from "../services/accounting-purchase-request";
import { get_debit_records_service } from "../services/debit-records-service";
import { accountingSlice } from "./accounting-slice";

export function get_cash_in_bank_thunk() {
    return async function (dispatch, getState) {
        const res = await get_cash_in_bank_service();
        dispatch(accountingSlice.actions.setCashInBank(res.data));
    };
}


export function get_debit_records_thunk() {
    return async function (dispatch, getState) {
        const res = await get_debit_records_service();
        dispatch(accountingSlice.actions.setDebitRecords(res.data));
    };
}

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
        dispatch(accountingSlice.actions.setRefunds(res.data));
    };
}

export function get_petty_cash_thunk() {
    return async function (dispatch, getState) {
        const res = await get_petty_cash_service();
        dispatch(accountingSlice.actions.setPettyCashes(res.data));
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



