import axiosInstance from './axiosInstance'
import Cookies from 'universal-cookie';

const cookies = new Cookies();
// attach response interceptor
const responseInterceptor = axiosInstance.interceptors.response.use((response) => {
    // status code = 2xx
    const data = response.data
    console.log("data in res: ", data)
    if(data.success && data.token){
        // the user is now logged in
        cookies.set("token", data.token)
    }
    if (data.authenticated === false || data.registered === false || data.oauth === true) {
        // redirect to home if not authenticated or not registered or oauth is needed 
        return window.location = "/";
    } else {
        return response;
    }
}, (error) => {
    return Promise.reject(error);
});

export default responseInterceptor;