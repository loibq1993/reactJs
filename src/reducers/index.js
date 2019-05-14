import * as type from "../actions/actionType";
import {combineReducers} from 'redux';

const   productsReducer = (state = [], action) => {
    switch (action.type) {
        case type.GET_ALL_DATA:
            return state = action.products;
        case type.GET_ONE_DATA:
            return action.product;
        case type.ADD_DATA:
            return [...state, action.payload];
        case type.EDIT_DATA:
            return ;
        case type.DELETE_DATA:
            return ;
        default:
            return state;
    }
};

 export default combineReducers({
     products : productsReducer,
 });