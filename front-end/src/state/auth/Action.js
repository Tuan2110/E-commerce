import axios from "axios"
import { API_BASE_URL } from "../../config/apiConfig"
import { GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { Alert } from "@mui/material";


const token = localStorage.getItem('jwt');
const registerRequest = ()=>({
    type: REGISTER_REQUEST
});
const registerSuccess = (user)=>({
    type: REGISTER_SUCCESS,
    payload: user
});
const registerFailure = (error)=>({
    type: REGISTER_FAILURE,
    payload: error
});

export const register = (userData)=> async (dispatch)=>{
    dispatch(registerRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/register`,userData);
        // const user = response.data;
        // alert(response.data.message)
        // <Alert severity="success">{{response.message}}</Alert>
        
        // if(user.token){
        //     localStorage.setItem('jwt',user.token);
        // }
        // console.log("user ",user);
        dispatch(registerSuccess(response));
    } catch (error) {
        dispatch(registerFailure(error.message));
    }
}

const loginRequest = ()=>({
    type: LOGIN_REQUEST
});
const loginSuccess = (user)=>({
    type: LOGIN_SUCCESS,
    payload: user
});
const loginFailure = (error)=>({
    type: LOGIN_FAILURE,
    payload: error
});

export const login = (userData)=> async (dispatch)=>{
    dispatch(loginRequest());
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`,userData);
        console.log("response ",response);
        const user = response.data;
        if(user.token){
            localStorage.setItem('jwt',user.token);
        }
        console.log("user ",user);
        dispatch(loginSuccess(user));
    } catch (error) {
        dispatch(loginFailure(error.response.data.message));
    }
}

const getUserRequest = ()=>({
    type: GET_USER_REQUEST
});
const getUserSuccess = (user)=>({
    type: GET_USER_SUCCESS,
    payload: user
});
const getUserFailure = (error)=>({
    type: GET_USER_FAILURE,
    payload: error
});

export const getUser = (jwt)=> async (dispatch)=>{
    dispatch(getUserRequest());
    try {
        const response = await axios.get(`${API_BASE_URL}/users`,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        });
        const user = response.data;
        console.log("user ",user);
        dispatch(getUserSuccess(user));
    } catch (error) {
        dispatch(getUserFailure(error.message));
    }
}

const logout = ()=>({
    type: LOGOUT
});

export const logoutUser = ()=> async (dispatch)=>{
    dispatch(logout());
    localStorage.removeItem('jwt');
}