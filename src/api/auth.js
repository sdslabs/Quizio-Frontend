import axiosInstance from './axiosInstance'
import Cookies from 'universal-cookie';
import requestInterceptor from './requestInterceptor'
import responseInterceptor from './responseInterceptor'

axiosInstance.defaults.withCredentials = true // can remove line?
const cookies = new Cookies();

export const checkAuthAtHome = async () => {
    axiosInstance.interceptors.response.eject(responseInterceptor)
    return axiosInstance.get(`/home`)
        .then((res) => {
            return res.data
        })
        .catch((error) => {
            return Promise.reject(error);
        })
}


export const signup = (username, name, bio, org, num, enrl, course, codeforces, codechef, github) => {
    let postData = {
        username: username,
        name: name,
        bio: bio,
        organisation: org,
        mobile: num,
        enrollment: enrl,
        course: course,
        codeforces: 'https://codeforces.com/profile/' + codeforces,
        codechef: 'https://www.codechef.com/users/' + codechef,
        github: 'https://github.com/' + github
    };

    return axiosInstance.post(`/auth/signup`, postData)
    // .then(res => {
    //     const body = res.data
    //     if (body.success === false) {
    //         return res.data.error
    //     }
    //     else {
    //         window.location = "/signin";
    //     }
    // })
    // .catch(error => {
    //     console.log(error);
    // })
}

/// login into quizio
export const login = async () => {

    axiosInstance.interceptors.response.eject(responseInterceptor);
    return axiosInstance.get(`/auth/signin`)
        .then(res => {
            return res.data
        })
        .catch((error) => {
            return Promise.reject(error);
        })
}

/// logout from quizio
export const logout = () => {
    axiosInstance.interceptors.response.eject(responseInterceptor);
    cookies.remove('token')
    localStorage.removeItem("userId");
    return axiosInstance.get(`/auth/logout`)
}