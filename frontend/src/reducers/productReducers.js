import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstants';
export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST: // This is the action type that we created in productConstants.js
            return { loading: true, products: [] };
        case PRODUCT_LIST_SUCCESS: // This is the action type that we created in productConstants.js
            return { loading: false, products: action.payload };
        case PRODUCT_LIST_FAIL: // This is the action type that we created in productConstants.js
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}