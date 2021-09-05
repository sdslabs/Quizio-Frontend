import axiosInstance from './axiosInstance'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// attach request interceptor
const requestInterceptor = axiosInstance.interceptors.request.use((config) => {
    const token = cookies.get('token')
    const sdslabs = cookies.get('sdslabs')
    console.log(`request intercepted! token: ${!!token}, sdslabs: ${!!sdslabs}`)
    config.headers.Authorization = token
    return config

}, (error) => {
    return Promise.reject(error);
});

export default requestInterceptor;