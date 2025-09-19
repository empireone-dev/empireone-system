import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

export const accountingSlice = createSlice({
    name: "accounting",
    initialState: {
        expense: {},
        expenses: [],
        cash_flow:{},
        cash_flows: [],
        daily_expenses: [],
        expenses_reports: [],
        purchase_requests:[],
        purchase_request:{}
    },
    reducers: {
        setExpense: (state, action) => {
            state.expense = action.payload;
        },
        setExpenses: (state, action) => {
            state.expenses = action.payload;
        },
        setCashFlow: (state, action) => {
            state.cash_flow = action.payload;
        },
        setCashFlows: (state, action) => {
            state.cash_flows = action.payload;
        },
        setDailyExpenses: (state, action) => {
            state.daily_expenses = action.payload;
        },
        setExpensesReports: (state, action) => {
            state.expenses_reports = action.payload;
        },
        setPurchaseRequests: (state, action) => {
            state.purchase_requests = action.payload;
        },
        setPurchaseRequest: (state, action) => {
            state.purchase_request = action.payload;
        },
    },
});
export const { setExpense,setExpenses,setDailyExpenses,setExpensesReports,setPurchaseRequest } =
    accountingSlice.actions;

export default accountingSlice.reducer;
