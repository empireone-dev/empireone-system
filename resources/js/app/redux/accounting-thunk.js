import { get_accounting_expenses_service } from "../services/accounting-expenses-service";
import { accountingSlice } from "./accounting-slice";



export function get_accounting_expenses_thunk() {
    return async function (dispatch, getState) {
        const res = await get_accounting_expenses_service();
        dispatch(accountingSlice.actions.setExpenses(res.data));
    };
}

