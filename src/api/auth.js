import axiosInstance from './axiosInstance'
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const checkAuth = async () => {
    console.log(`/auth/`)
    return axiosInstance.get(`/auth/`)
        .then(res => {
            return res.data
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
                return true
            } else {
                return false
            }
        })
}

