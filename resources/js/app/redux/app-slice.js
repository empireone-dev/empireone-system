import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name: "app",
    initialState: {
        user: {},
        sidebarOpen:false,
        carts:[],
        load:Math.random(),
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
    },
});
export const { setUser,setSidebarOpen,setCarts,setLoad } =
    appSlice.actions;

export default appSlice.reducer;
