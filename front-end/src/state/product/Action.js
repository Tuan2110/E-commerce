import { API_BASE_URL, api } from "../../config/apiConfig";
import { FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS, FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, GET_TOP_SALE_FAILURE, GET_TOP_SALE_REQUEST, GET_TOP_SALE_SUCCESS } from "./ActionType";


export const findProducts=(reqData)=>async(dispatch)=>{
    dispatch({type:FIND_PRODUCTS_REQUEST});
    const {category,colors,minPrice,maxPrice,secondLvCategory,thirdLvCategory,pageNumber,pageSize,sort}=reqData;
    try {
        const {data} = await api.get(`${API_BASE_URL}/products?category=${category}&colors=${colors}&minPrice=${minPrice}&maxPrice=${maxPrice}`
        +`&secondLvCategory=${secondLvCategory}&thirdLvCategory=${thirdLvCategory}`
        +`&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}`);

        console.log('Product Data:',data);
        dispatch({type:FIND_PRODUCTS_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:FIND_PRODUCTS_FAILURE,payload:error.message});
    }
}

export const findProductById=(id)=>async(dispatch)=>{
    dispatch({type:FIND_PRODUCT_BY_ID_REQUEST});
    try {
        const {data} = await api.get(`/products/id/${id}`);
        console.log('Product Data:',data);
        dispatch({type:FIND_PRODUCT_BY_ID_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:FIND_PRODUCT_BY_ID_FAILURE,payload:error.message});
    }
}

export const getTopSale=()=>async(dispatch)=>{
    dispatch({type:GET_TOP_SALE_REQUEST});
    try {
        const {data} = await api.get(`${API_BASE_URL}/products/top-sale`);
        console.log('Product Data:',data);
        dispatch({type:GET_TOP_SALE_SUCCESS,payload:data});
    } catch (error) {
        dispatch({type:GET_TOP_SALE_FAILURE,payload:error.message});
    }
}