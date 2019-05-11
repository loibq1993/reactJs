import * as types from './actionType';

const requestData = (products) => {
    return {type : types.ADD_POST}
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



