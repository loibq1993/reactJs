import callApi from "../callApi";
import * as act from "./actionCreators";
import history from '../history.js';
const token = localStorage.getItem('token')

export const actRequestFetchData = () => {
    return async (dispatch) => {
        try {
            if (token) {
                const res = await callApi('product', 'GET', null, token);
                dispatch(act.actFetchAllData(res.data));
            } else {
                localStorage.removeItem("token")
            }
        }
        catch (error) {
            // dispatch(act.actFetchAllData(error.response.data.errors));
        }
    }
};

export const actRequestDeleteData = (id) => {
    return async (dispatch) => {
        try {
            const res = await callApi('product/delete/' + id, 'DELETE', null, token);
            dispatch(act.actDeleteData(res.data));
        }
        catch (error) {
            dispatch(act.actDeleteData(error.response.data.errors));
        }
    }
};

export const actRequestEditData = (id) => {
    return async (dispatch) => {
        try {
            const res = await callApi('product/edit/' + id , 'GET', null, token);
            dispatch(act.actEditData(res.data));
        }
        catch (error) {
            act.actEditData(error.response.data)
        }
    }
};

export const actRequestUpdateData = (formData,id) => {
    return async (dispatch) => {
        try {
            const res = await callApi('product/update/' + id, 'PUT', formData, token);
            dispatch(act.actFetchAllData(res.data));
            history.push('/')
        }
        catch (errors) {
            // dispatch(act.actUpdateFailed(errors.response.data.error));
        }
    }
};

export const actRequestCreateData = (formData) => {
    return async (dispatch) => {
        try {
            const res = await callApi('product/store', 'POST', formData, token);
            dispatch(act.actFetchAllData(res.data));
            history.push('/')
        }
        catch (errors) {
            dispatch(act.actCreateDataFailed(errors.response.data));
        }
    }
};
export const actRequestCreateView = () => {
    return async (dispatch) => {
        try {
            const res = await callApi('product/create' , 'GET', null, token);
            console.log(res);
            dispatch(act.actCreateView(res.data));
        }
        catch (error) {
            dispatch(act.actCreateView(error.response.data.errors));
        }
    }
};