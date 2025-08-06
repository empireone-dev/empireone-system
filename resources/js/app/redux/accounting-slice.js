import { createSlice } from "@reduxjs/toolkit";

export const accountingSlice = createSlice({
    name: "accounting",
    initialState: {
        expense: {},
        expenses: [],
    },
    reducers: {
        setExpense: (state, action) => {
            state.expense = action.payload;
        },
        setExpenses: (state, action) => {
            state.expenses = action.payload;
        }
    },
});
export const { setExpense,setExpenses } =
    accountingSlice.actions;

export default accountingSlice.reducer;
