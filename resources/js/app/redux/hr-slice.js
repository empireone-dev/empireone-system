import { createSlice } from "@reduxjs/toolkit";

export const hrSlice = createSlice({
    name: "hr",
    initialState: {
        ir: {},
        irs: [],
    },
    reducers: {
        setIr: (state, action) => {
            state.ir = action.payload;
        },
        setIrs: (state, action) => {
            state.irs = action.payload;
        },
    },
});
export const { setIr, setIrs } = hrSlice.actions;

export default hrSlice.reducer;
