import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

export const accountingSlice = createSlice({
    name: "accounting",
    initialState: {
        expense: {},
        expenses: [],
        cash_flow: {},
        cash_flows: [],
        daily_expenses: [],
        expenses_reports: [],
        purchase_requests: [],
        purchase_request: {},
        cash_in_bank: {},
        debit_records: [],
        refunds:[],
        refund:{},
        pettycashes:[],
        pettycash:{},
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
        setCashInBank: (state, action) => {
            state.cash_in_bank = action.payload;
        },
        setDebitRecords: (state, action) => {
            state.debit_records = action.payload;
        },
        setRefunds: (state, action) => {
            state.refunds = action.payload;
        },
        setRefund: (state, action) => {
            state.refund = action.payload;
        },
        setPettyCashes: (state, action) => {
            state.pettycashes = action.payload;
        },
        setPettyCash: (state, action) => {
            state.pettycash = action.payload;
        },
    },
});
export const {
    setExpense,
    setExpenses,
    setDailyExpenses,
    setExpensesReports,
    setPurchaseRequest,
    setCashInBank,
    setDebitRecords,
    setRefunds,
    setRefund,
    setPettyCashes,
    setPettyCash,
} = accountingSlice.actions;

export default accountingSlice.reducer;
