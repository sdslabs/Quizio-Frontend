import axiosInstance from './axiosInstance'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

/// check if user is authenticated, and log them in if they are
export const checkAuth = async () => {
    console.log(`/auth/`)
    return axiosInstance.get(`/auth/`)
        .then(res => {
            let data = res.data
            if (data.oauth && data.authenticated) {
                localStorage.setItem('userId', data.userId)
                cookies.set('token', data.token)
            }
            return data
        })
    }
    
    /// login into quizio
    export const login = async () => {
        console.log(`/auth/signin`)
        return axiosInstance.get(`/auth/signin`)
        .then(res => {
            let data = res.data
            if (data.success) {
                localStorage.setItem('userId', data.userId)
                cookies.set('token', data.token)
            } 
                return data.success
        })
}

/// logout from quizio
export const logout = async () => {

    cookies.remove('token')
    localStorage.removeItem("userId");
    return axiosInstance.get(`/auth/logout`)
        .then((res) => {
            return res
        })
}