import { configureStore } from "@reduxjs/toolkit";
import appSlice from "@/app/redux/app-slice";
import categoriesSlice  from "../redux/categories-slice";
import activitiesSlice  from "../redux/activity-slice";
import sitesSlice  from "../redux/site-slice";
import ticketsSlice  from "../redux/ticket-slice";
import  accountSlice from "../redux/account-slice";
import  dashboardsSlice  from "../redux/dashboard-slice";

const store = configureStore({
    reducer: {
        app: appSlice,
        categories: categoriesSlice,
        activities: activitiesSlice,
        sites:sitesSlice,
        tickets:ticketsSlice,
        accounts:accountSlice,
        dashboards:dashboardsSlice
    },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
