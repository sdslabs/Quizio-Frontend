import axios from "axios";
import config from '../config/config.js';

// Create an axios instance for sending API requests through axios
let axiosInstance = axios.create({
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    baseURL: config.API.baseURL,
});

axiosInstance.defaults.withCredentials = true;

export default axiosInstance;