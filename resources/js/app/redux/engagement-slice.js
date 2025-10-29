import { createSlice } from "@reduxjs/toolkit";

export const engagementSlice = createSlice({
    name: "engagement",
    initialState: {
        activity: {},
        activities: [],
        calendars: [],
        calendar: {},
    },
    reducers: {
        setActivity: (state, action) => {
            state.activity = action.payload;
        },
        setActivities: (state, action) => {
            state.activities = action.payload;
        },
        setCalendars: (state, action) => {
            state.calendars = action.payload;
        },
        setCalendar: (state, action) => {
            state.calendar = action.payload;
        },
    },
});
export const { setActivity, setActivities, setCalendars, setCalendar } =
    engagementSlice.actions;

export default engagementSlice.reducer;
