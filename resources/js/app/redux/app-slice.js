import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        user: {},
        sidebarOpen:false,
        carts:[],
        load:Math.random(),
        chatbots:[]
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
         setSidebarOpen: (state, action) => {
            state.sidebarOpen = action.payload;
        },
        setCarts: (state, action) => {
            state.carts = action.payload;
        },
        setLoad: (state, action) => {
            state.load = action.payload;
        },
        setChatBots: (state, action) => {
            state.chatbots = action.payload;
        },
    },
});
export const { setUser,setSidebarOpen,setCarts,setLoad,setChatBots } =
    appSlice.actions;

export default appSlice.reducer;
