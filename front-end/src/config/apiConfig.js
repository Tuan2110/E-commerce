import axios from "axios";

export const API_BASE = 'http://localhost:8080';
export const API_BASE_URL = 'http://localhost:8080/api/v1';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const updateJwtInApiHeaders = (jwt) => {
    api.defaults.headers.common['Authorization'] = jwt ? `Bearer ${jwt}` : null;
}

const initialJwt = localStorage.getItem('jwt');
updateJwtInApiHeaders(initialJwt);