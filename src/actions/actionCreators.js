import * as types from './actionType';

export const actFetchAllData = (products) => {
    return {
        type : types.GET_ALL_DATA,
        products
    }
};

export const actDeleteData = (id) => {
    return {
        type: types.DELETE_DATA,
        id
    }
};

export const actEditData = (product) => {
    return {
        type : types.EDIT_DATA,
        product
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
};

export const actCreateData = (product) => {
    return {
        type : types.CREATE_DATA,
        product
    }
};

export const actCreateView = (product) => {
    return {
        type: types.CREATE_DATA_VIEW,
        product
    }
}

export const actCreateDataFailed = (errors) => {
    return {
        type : types.CREATE_DATA_FAILED,
        errors,
    }
};

export const actFetchOneData = (product) => {
    return {
        type : types.GET_ONE_DATA,
        product
    }
};

export const actLogin = (user) => {
    return {
        type: types.LOGIN,
        user
    }
};

export const actLoginFailed = (errors) => {
    return {
        type: types.LOGIN_FAILED,
        errors
    }
};

export const actCreateUser = (user) => {
    return {
        type : types.CREATE_DATA,
        user
    }
};










