import { createSlice } from "@reduxjs/toolkit";

export const ticketsSlice = createSlice({
    name: "tickets",
    initialState: {
        ticket: {},
        tickets: [],
        prompts:{},
        stats: []
    },
    reducers: {
        setTicket: (state, action) => {
            state.ticket = action.payload;
        },
        setTickets: (state, action) => {
            console.log('action.payload',action.payload)
            state.tickets = action.payload;
        },
        setPrompts: (state, action) => {
            state.prompts = action.payload;
        },
        setStats: (state, action) => {
            state.stats = action.payload;
        }
    },
});
export const { setTicket, setTickets, setPrompts, setStats } = ticketsSlice.actions;

export default ticketsSlice.reducer;
