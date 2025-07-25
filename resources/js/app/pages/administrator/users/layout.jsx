import { get_account_by_department_thunk } from "@/app/redux/account-thunk";
import store from "@/app/store/store";
import React, { useEffect } from "react";
import CreateUserSection from "./sections/create-user-section";
import { department_slug } from "@/app/lib/search-lib";

export default function UsersLayout({ children }) {
    const queryParams = new URLSearchParams(window.location.search);
    const search = queryParams.get("search") ?? "";
    const page = queryParams.get("page") ?? "";
    
    useEffect(() => {
        async function get_data(params) {
            await store.dispatch(
                get_account_by_department_thunk({
                    department: department_slug(),
                    page: page,
                    search:search
                })
            );
        }
        get_data();
    }, []);

    return (
        <div className="flex flex-col gap-3">
            <div className="w-full flex items-end justify-end">
                <CreateUserSection />
                {page}
            </div>
            {children}
        </div>
    );
}
