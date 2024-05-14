// reducer.js
import {
    CREATE_REVIEW_SUCCESS,
    CREATE_REVIEW_FAILURE,
    GET_ALL_REVIEWS_SUCCESS,
    GET_ALL_REVIEWS_FAILURE
  } from './ActionType';
  
  const initialState = {
    reviews: [],
    error: ''
  };
  
  const ReviewReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_REVIEW_SUCCESS:
        return {
          ...state,
          reviews: [...state.reviews, action.payload],
          error: ''
        };
      case CREATE_REVIEW_FAILURE:
        return {
          ...state,
          error: action.payload
        };
      case GET_ALL_REVIEWS_SUCCESS:
        return {
          ...state,
          reviews: action.payload,
          error: ''
        };
      case GET_ALL_REVIEWS_FAILURE:
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default ReviewReducer;
  