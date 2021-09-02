import axiosInstance from "./axiosInstance";

// attach response interceptor
axiosInstance.interceptors.response.use((response) => {
    // status code = 2xx
    const data = response.data
    if (data.authenticated === false || data.registered === false || data.oauth === true) {
        // redirect to home if not authenticated or not registered or oauth is needed 
        return window.location = "/";
    } else {
        return response;
    }
}, (error) => {
    return Promise.reject(error);
});


export default axiosInstance;