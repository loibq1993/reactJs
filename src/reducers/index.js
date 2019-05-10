import * as type from "../actions/actionType";


const   products = (state = [], action) => {
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
}
 export default products;