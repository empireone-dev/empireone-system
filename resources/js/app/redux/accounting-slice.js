import { createSlice } from "@reduxjs/toolkit";

export const accountingSlice = createSlice({
    name: "accounting",
    initialState: {
        expense: {},
        expenses: [],
        cash_flow:{},
        cash_flows: [],
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
        }
    },
});
export const { setExpense,setExpenses } =
    accountingSlice.actions;

export default accountingSlice.reducer;
