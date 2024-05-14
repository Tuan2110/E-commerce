import { api } from '../../config/apiConfig';
import {
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAILURE,
    GET_ALL_REVIEWS_SUCCESS,
    GET_ALL_REVIEWS_FAILURE
  } from './ActionType';

export const createReview = (resData) => {
  return async (dispatch) => {
    try {
      const response = await api.post(`/reviews/create/${resData.productId}/item/${resData.itemId}`,resData.review);

      dispatch({
        type: CREATE_REVIEW_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: CREATE_REVIEW_FAILURE,
        payload: error.message
      });
    }
  };
};

export const getAllReviews = (productId) => {
  return async (dispatch) => {
    try {
      const response = await api.get(`/reviews/product/${productId}`);

      dispatch({
        type: GET_ALL_REVIEWS_SUCCESS,
        payload: response.data
      });
    } catch (error) {
      dispatch({
        type: GET_ALL_REVIEWS_FAILURE,
        payload: error.message
      });
    }
  };
};