import callApi from "../callApi";
import * as act from "./actionCreators";

export const actRequestFetchData = () => {
    return (dispatch) => {
        return callApi('product','GET',null)
            .then( res => {
                dispatch(act.actFetchAllData(res.data));
            })
            .catch((error) => {
                dispatch(act.actFetchAllData(error.response.data.errors));
            });
    }
};

export const actRequestDeleteData = (id) => {
    return (dispatch) => {
        return callApi('product/'+id,'DELETE',null)
            .then((res) => {
                dispatch(act.actDeleteData(res.data));
            })
            .catch((error) => {
                dispatch(act.actDeleteData(error.response.data.errors));
            });
    }
};

export const actRequestEditData = (id) => {
    return (dispatch) => {
        return callApi('product/'+id+'/edit','GET',null)
            .then((res) => {
                dispatch(act.actEditData(res.data));
            })
            .catch((error) => {
                dispatch(act.actEditData(error.response.data.errors));
            });
    }
};

export const actRequestUpdateData = (formData,id) => {
    return (dispatch) => {
        return callApi('product/'+id,'POST',formData)
            .then((res) => {
                dispatch(act.actUpdateData(res.data));
            })
            .catch((errors) => {
                dispatch(act.actUpdateFailed(errors.response.data.error))
            });
    }
};

export const actRequestCreateData = (formData) => {
    return (dispatch) => {
        return callApi('product','POST',formData)
            .then((res) => {
                dispatch(act.actCreateData(res.data));
            })
            .catch( (errors) => {
                dispatch(act.actCreateDataFailed(errors.response.data))
            });
    }
};
