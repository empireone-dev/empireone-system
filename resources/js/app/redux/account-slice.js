import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: "accounts",
    initialState: {
        account: {},
        accounts: [],
        user: {},
        employee: {},
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
        },
        setAccounts: (state, action) => {
            state.accounts = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setEmployee: (state, action) => {
            state.employee = action.payload;
        }
    },
});
export const { setAccount, setAccounts, setUser, setEmployee } = accountSlice.actions;

export default accountSlice.reducer;
