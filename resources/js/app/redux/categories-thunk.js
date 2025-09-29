import {
    create_categories_service,
    get_categories_by_id_service,
    get_categories_service,
    update_categories_service,
} from "../services/categories-service";
import { categoriesSlice } from "./categories-slice";

export function get_categories_thunk(department) {
    return async function (dispatch, getState) {
        const res = await get_categories_service(department);
        dispatch(categoriesSlice.actions.setCategories(res.data));
    };
}

export function create_categories_thunk(data) {
    return async function (dispatch, getState) {
        const res = await create_categories_service(data);
    };
}

export function get_categories_by_id_thunk(id) {
    return async function (dispatch, getState) {
        const res = await get_categories_by_id_service(id);
        dispatch(categoriesSlice.actions.setCategory(res));
    };
}

export function delete_categories_thunk(id) {
    return async function (dispatch, getState) {};
}

export function update_categories_thunk(data) {
    return async function (dispatch, getState) {
        const res = await update_categories_service(data);
    };
}

export function update_categoriess_thunk(data) {
    return async function (dispatch, getState) {};
}
