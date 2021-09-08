import axios from "axios";
import Cookies from 'universal-cookie';
import config from '../config/config.js';

const cookies = new Cookies();

// Create an axios instance for sending API requests through axios
let axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    baseURL: config.API.baseURL,
});

axiosInstance.defaults.withCredentials = true;


// attach request interceptor
export const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
    const token = cookies.get('token')
    config.headers.Authorization = token
    return config

}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;