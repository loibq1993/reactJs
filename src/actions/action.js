import * as types from './actionType';
import callApi from '../callApi'

export const actFetchDataRequest = () =>{
    return (dispatch) => {
        callApi('product','GET',null)
            .then( (res) => {
                dispatch(actFetchData(res.data));
            })
    }

}

const requestData = (products) => {
    return {type : types.REQ_DATA}
};

const getErrorData = (products) => {
    return {
        type : types.GET_ERROR,
        products
    }
};

export const actFetchData = (products) => {
    return {
        type : types.GET_DATA,
        products
    }
};



