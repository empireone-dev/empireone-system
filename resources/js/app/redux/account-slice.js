import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
    name: "accounts",
    initialState: {
        account: {},
        accounts:[],
        user: {},
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
    },
});
export const { setAccount,setAccounts,setUser } =
    accountSlice.actions;

export default accountSlice.reducer;
