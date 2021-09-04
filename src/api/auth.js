import axiosInstance from './axiosInstance'
import cookie from 'react-cookies'
import requestInterceptor from './requestInterceptor'
import responseInterceptor from './responseInterceptor'
import { fetchPublicQuizzes } from './quizzes'
import config from '../config/config.js'

axiosInstance.defaults.withCredentials = true // can remove line?

let jwt = require('jsonwebtoken')
const JWT_KEY = config.AUTH.jwt_key;


export const checkAuthAtHome = () => {
    axiosInstance.interceptors.response.eject(responseInterceptor);
    return fetchPublicQuizzes();
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
export const login = () => {

    // axiosInstance.interceptors.response.eject(responseInterceptor);
    return axiosInstance.get(`/auth/signin`)
}

/// logout from quizio
export const logout = () => {
    
    cookie.remove('token')
    localStorage.removeItem("username");
    axiosInstance.interceptors.response.eject(responseInterceptor);
    return axiosInstance.get(`/auth/logout`)
}

/// ??
export const giveUsername = () => {

    let token = cookie.load('Quizio')
    let obj = jwt.verify(token, JWT_KEY);
    if (obj) return obj.email;
    return null
}

