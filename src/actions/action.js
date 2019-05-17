import * as types from './actionType';
import callApi from "../callApi";

export const actRequestFetchData = () => {
    return (dispatch) => {
        return callApi('product','GET',null)
            .then( res => {
                dispatch(actFetchAllData(res.data));
            })
            .catch((error) => {
                dispatch(actFetchAllData(error.response.data.errors));
            });
    }
};

export const actFetchAllData = (products) => {
    return {
        type : types.GET_ALL_DATA,
        products
    }
};

export const actRequestDeleteData = (id) => {
    return (dispatch) => {
        return callApi('product/'+id,'DELETE',null)
            .then((res) => {
                dispatch(actDeleteData(res.data));
            })
            .catch((error) => {
                dispatch(actDeleteData(error.response.data.errors));
            });
    }
};

export const actDeleteData = (id) => {
    return {
        type: types.DELETE_DATA,
        id
    }
};

export const actRequestEditData = (id) => {
    return (dispatch) => {
        return callApi('product/'+id+'/edit','GET',null)
            .then((res) => {
                dispatch(actEditData(res.data));
            })
            .catch((error) => {
                dispatch(actEditData(error.response.data.errors));
            });
    }
};

export const actEditData = (product) => {
    return {
        type : types.EDIT_DATA,
        product
    }
};

export const actRequestUpdateData = (formData,id) => {
    return (dispatch) => {
        return callApi('product/'+id,'POST',formData)
            .then((res) => {
                dispatch(actUpdateData(res.data));
            })
            .catch((errors) => {
                dispatch(actUpdateFailed(errors.response.data.error))
            });
    }
};

export const actUpdateData = (product) => {
    return {
        type : types.UPDATE_DATA,
        product,
    }
};

export const actUpdateFailed = (errors)=> {
    return {
        type : types.UPDATE_DATA_FAILED,
        errors,
    }
}

export const actRequestAddData = () => {
    return (dispatch) => {
        return callApi('product','POST',null)
            .then((res) => {
                dispatch(actAddData(res.data));
            });
    }
};

export const actAddData = (product) => {
    return {
        type : types.ADD_DATA,
        product
    }
};


export const actFetchOneData = (product) => {
    return {
        type : types.GET_ONE_DATA,
        product
    }
};














