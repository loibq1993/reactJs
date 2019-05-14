import * as types from './actionType';
import callApi from "../callApi";

export const actRequestData = () => {
    return (dispatch,action) => {
        switch (action.types) {
            case types.GET_ONE_DATA:
                return callApi('product','GET',null);
            case types.ADD_DATA:
                return callApi('product','POST',null);
            case types.EDIT_DATA:
                return callApi('product','POST',null);
            case types.DELETE_DATA:
                return callApi('product','DELETE',null);
            default:
                return callApi('product','GET',null)
                    .then( (res) => {
                        // this.setState({products :res.data});
                        dispatch(actFetchAllData(res.data));
                        // this.props.fetchAllProducts(res.data);
                    })
        }
    }
}

export const actFetchAllData = (products) => {
    return {
        type : types.GET_ALL_DATA,
        products
    }
};

export const actFetchOneData = (product) => {
    return {
        types : types.GET_ONE_DATA,
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

export const actDeleteData = (product) => {
    return {
        type: types.DELETE_DATA,
        product
    }
};









