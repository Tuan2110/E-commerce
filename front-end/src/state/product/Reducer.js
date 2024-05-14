import { FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, GET_TOP_SALE_FAILURE, GET_TOP_SALE_REQUEST, GET_TOP_SALE_SUCCESS } from "./ActionType"

const initialState = {
    products : [],
    topProducts: [],
    product : null,
    loading : false,
    error : null
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case FIND_PRODUCTS_REQUEST:
        case FIND_PRODUCT_BY_ID_REQUEST:
        case GET_TOP_SALE_REQUEST:
            return {...state, loading : true,error : null}
        case FIND_PRODUCTS_SUCCESS:
            return {...state, products : action.payload, loading : false, error : null}
        case GET_TOP_SALE_SUCCESS:
            return {...state, topProducts : action.payload, loading : false, error : null}
        case FIND_PRODUCT_BY_ID_SUCCESS:
            return {...state, product : action.payload, loading : false, error : null}
        case FIND_PRODUCTS_FAILURE:
        case GET_TOP_SALE_FAILURE:
        case FIND_PRODUCT_BY_ID_FAILURE:
            return {...state, error : action.payload, loading : false}
        default:
            return state
    }
}