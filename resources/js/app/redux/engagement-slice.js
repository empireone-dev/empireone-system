import { createSlice } from "@reduxjs/toolkit";

export const engagementSlice = createSlice({
    name: "engagement",
    initialState: {
        engagement: {},
        engagements: [],
        calendars: [],
        calendar: {},
    },
    reducers: {
        setEngagement: (state, action) => {
            state.engagement = action.payload;
        },
        setEngagements: (state, action) => {
            state.engagements = action.payload;
        },
        setCalendars: (state, action) => {
            state.calendars = action.payload;
        },
        setCalendar: (state, action) => {
            state.calendar = action.payload;
        },
    },
});
export const { setEngagement, setEngagements, setCalendars, setCalendar } = engagementSlice.actions;

export default engagementSlice.reducer;
