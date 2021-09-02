import axiosInstance from './axiosInstance'

// attach request interceptor
const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
    const token = cookie.load('token');
    config.headers.Authorization = token;
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default requestInterceptor;