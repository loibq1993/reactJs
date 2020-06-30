import callApi from "../callApi";
import * as act from "./actionCreators";
import history from '../history.js';

export const actRequestFetchData = () => {
    return async (dispatch) => {
        try {
            const res = await callApi('product', 'GET', null);
            dispatch(act.actFetchAllData(res.data));
        }
        catch (error) {
            console.log(error);
            // dispatch(act.actFetchAllData(error.response.data.errors));
        }
    }
};

export const actRequestDeleteData = (id) => {
    return async (dispatch) => {
        try {
            const res = await callApi('product/delete/' + id, 'DELETE', null);
            dispatch(act.actDeleteData(res.data));
        }
        catch (error) {
            console.log(error);
            dispatch(act.actDeleteData(error.response.data.errors));
        }
    }
};

export const actRequestEditData = (id) => {
    return async (dispatch) => {
        try {
            const res = await callApi('product/edit/' + id , 'GET', null);
            dispatch(act.actEditData(res.data));
        }
        catch (error) {
            console.log(error)
            dispatch(act.actEditData(error.response.data.errors));
        }
    }
};

export const actRequestUpdateData = (formData,id) => {
    return async (dispatch) => {
        try {
            const res = await callApi('product/update/' + id, 'PUT', formData);
            dispatch(act.actFetchAllData(res.data));
            history.push('/')
        }
        catch (errors) {
            console.log(errors);
            // dispatch(act.actUpdateFailed(errors.response.data.error));
        }
    }
};

export const actRequestCreateData = (formData) => {
    return async (dispatch) => {
        try {
            const res = await callApi('product/create', 'POST', formData);
            dispatch(act.actFetchAllData(res.data));
            history.push('/')
        }
        catch (errors) {
            console.log(errors);
            dispatch(act.actCreateDataFailed(errors.response.data));
        }
    }
};
