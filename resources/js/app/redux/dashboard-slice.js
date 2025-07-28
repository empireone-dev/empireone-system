import { createSlice } from "@reduxjs/toolkit";

export const dashboardsSlice = createSlice({
    name: "app",
    initialState: {
        dashboard: {},
        dashboards: [],
    },
    reducers: {
        setDashboard: (state, action) => {
            state.dashboard = action.payload;
        },
        setDashboards: (state, action) => {
            state.dashboards = action.payload;
        },
    },
});
export const { dashboard, setDashboards } = dashboardsSlice.actions;

export default dashboardsSlice.reducer;
