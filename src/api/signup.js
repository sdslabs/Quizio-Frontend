import axiosInstance from './axiosInstance'
import cookie from 'react-cookies'
import requestInterceptor from './requestInterceptor'
import responseInterceptor from './responseInterceptor'
import {fetchPublicQuizzes} from './quizzes'
import config from '../config/config.js'

const baseURL = config.API.baseURL + 'auth/'
const postURL = baseURL + 'signup'


axiosInstance.defaults.withCredentials = true // can remove line?

let jwt = require('jsonwebtoken')
const JWT_KEY = config.AUTH.jwt_key;
let loginURL;

export const submit = (username, name, bio, org, num, enrl, course, codeforces, codechef, github) => {
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

    return axiosInstance.post(postURL, postData)
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

export const checkAuthAtHome = () => {
    axiosInstance.interceptors.response.eject(responseInterceptor);
    return fetchPublicQuizzes();
}

export const login = (loginStatus) => {
    axiosInstance.interceptors.response.eject(responseInterceptor);
    if (loginStatus) {
        loginURL = baseURL + 'logout/'
    }
    else {
        loginURL = baseURL + 'signin'
    }
    return axiosInstance.get(loginURL)
        // .then(res => {
        //     const body = res.data
        //     if (body.success === false) throw body.error
        //     else {
        //         if (loginStatus === true) {
        //             window.location = "/"
        //             cookie.remove('token')
        //             localStorage.removeItem("username");

        //         }
        //         return body;
        //     }
        // })
        // .catch(error => {
        //     console.log(error);
        // })
}

export const giveUsername = () => {
    let token = cookie.load('Quizio') // Doubt
    let obj = jwt.verify(token, JWT_KEY);
    if (obj) return obj.email;
    return null
}

