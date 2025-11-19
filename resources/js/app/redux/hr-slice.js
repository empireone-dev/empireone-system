import { createSlice } from "@reduxjs/toolkit";

export const hrSlice = createSlice({
    name: "hr",
    initialState: {
        ir: {},
        irs: [],
        incident_report:{}
    },
    reducers: {
        setIr: (state, action) => {
            state.ir = action.payload;
        },
        setIrs: (state, action) => {
            state.irs = action.payload;
        },
        setIncidentReport: (state, action) => {
            state.incident_report = action.payload;
        }
    },
});
export const { setIr, setIrs, setIncidentReport } = hrSlice.actions;

export default hrSlice.reducer;
