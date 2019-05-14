import * as types from './actionType';
import callApi from "../callApi";


export const actRequestFetchData = () => {
    return (dispatch) => {
        return callApi('product','GET',null)
            .then( res => {
                dispatch(actFetchAllData(res.data));
            });
    }
};

export const actRequestDeleteData = () => {
    return (dispatch) => {
        return callApi('product','DELETE',null)
            .then((res) => {
                dispatch(actDeleteData(res.data));
            });
    }
};

export const actRequestEditData = (id) => {
    return (dispatch) => {
        return callApi('product/'+id+'/edit','GET',null)
            .then((res) => {
                dispatch(actEditData(res.data));
            });
    }
};

export const actRequestUpdateData = (id) => {
    return (dispatch) => {
        return callApi('product/'+id+'/edit','GET',null)
            .then((res) => {
                dispatch(actEditData(res.data));
            });
    }
};

export const actRequestAddData = () => {
    return (dispatch) => {
        return callApi('product','POST',null)
            .then((res) => {
                dispatch(actAddData(res.data));
            });
    }
};

export const actFetchAllData = (products) => {
    return {
        type : types.GET_ALL_DATA,
        products
    }
};

export const actFetchOneData = (product) => {
    return {
        type : types.GET_ONE_DATA,
        product
    }
};

export const actAddData = (product) => {
    return {
        type : types.ADD_DATA,
        product
    }
};

export const actEditData = (product) => {
    return {
        type : types.EDIT_DATA,
        product
    }
};

export const actDeleteData = (id) => {
    return {
        type: types.DELETE_DATA,
        id
    }
};









