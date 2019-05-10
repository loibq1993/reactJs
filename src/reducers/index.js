import * as type from "../actions/actionType";
import {combineReducers} from 'redux';

const   productsReducer = (state = [], action) => {
    switch (action.type) {
        // case ADD_POST:
        //     return [...state, action.payload];
        // case DELETE_POST:
        //     return state.filter(post => post._id !== action.payload.id);
        case type.GET_DATA:
            return action.products;
        default:
            return state;
    }
};

 export default combineReducers({
     products : productsReducer,
 });