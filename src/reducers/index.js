import * as types from "../actions/actionType";
import {combineReducers} from 'redux';

const findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
        if(product.id === id){
            result = index;
        }
    });
    return result;
};

const productsReducer = (state = [], action) => {
    var index = -1;
    var {id} = action;
    switch (action.type) {
        case types.GET_ALL_DATA:
            return state = action.products;
        // case types.GET_ONE_DATA:
        //     return action.product;
        // case types.ADD_DATA:
        //     return [...state, action.payload];
        case types.EDIT_DATA:
            return state = action.product;
        case types.DELETE_DATA:
            index = findIndex(state, id);
            state.splice(index, 1);
            return action.id;
        default:
            return state;
    }
};

 export default combineReducers({
     products : productsReducer,
 });