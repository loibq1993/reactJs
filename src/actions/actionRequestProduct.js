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
            dispatch(act.actFetchAllData(error.response.data.errors));
        }
    }
};

export const actRequestDeleteData = (id) => {
    return async (dispatch) => {
        try {
            const res = await callApi('product/' + id, 'DELETE', null);
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
            const res = await callApi('product/' + id + '/edit', 'GET', null);
            dispatch(act.actEditData(res.data));
        }
        catch (error) {
            dispatch(act.actEditData(error.response.data.errors));
        }
    }
};

export const actRequestUpdateData = (formData,id) => {
    return async (dispatch) => {
        try {
            const res = await callApi('product/' + id, 'POST', formData);
            dispatch(act.actUpdateData(res.data));
            history.push('/');
        }
        catch (errors) {
            dispatch(act.actUpdateFailed(errors.response.data.error));
        }
    }
};

export const actRequestCreateData = (formData) => {
    return async (dispatch) => {
        try {
            const res = await callApi('product', 'POST', formData);
            dispatch(act.actCreateData(res.data));
        }
        catch (errors) {
            console.log(errors.response);
            dispatch(act.actCreateDataFailed(errors.response.data));
        }
    }
};
