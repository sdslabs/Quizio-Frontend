import axios from 'axios'
import quizAPI from './quizzes'
import { Redirect } from 'react-router-dom'
import Authinterceptor from './interceptor';
import cookie from 'react-cookies'

require('./headerInterceptor');
const config = require('../config/config.json')

const checkURL = config.API.baseURL

const baseURL = config.API.baseURL + 'auth/';
axios.defaults.withCredentials = true;
var jwt = require('jsonwebtoken');
const JWT_KEY = config.AUTH.jwt_key;
let loginURL;
export default class Signup {
    constructor() {
        this.postURL = baseURL + 'signup';
    }
    submit( username , name, bio , org , num , enrl , course,codeforces , codechef , github ,  reject) {
        let postData = {
            username: username,
            name: name,
            bio: bio,
            organisation : org,
            mobile : num,
            enrollment : enrl,
            course : course,
            codeforces : 'https://codeforces.com/profile/' + codeforces,
            codechef : 'https://www.codechef.com/users/' + codechef,
            github : 'https://github.com/' + github
        };
        return axios.post(this.postURL, postData)
        .then(res => {
            const body = res.data
            if(body.success === false){
              return res.data.error
            }
            else{
                window.location = "/signin";
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    checkAuthAtHome(){
        axios.interceptors.response.eject(Authinterceptor);
        return quizAPI.fetchPublicQuizzes();
    }

    login(loginStatus) {
        axios.interceptors.response.eject(Authinterceptor);
      if(loginStatus){
            loginURL = baseURL + 'logout/'
       }
       else{
           loginURL = baseURL + 'signin'
       }
        return axios.get(loginURL)
        .then(res => {
            const body = res.data
            if(body.success === false) throw body.error
            else {
                if(loginStatus === true){
                  window.location = "/"
                  cookie.remove('token')
                  localStorage.removeItem("username");

                }
                return body;
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
    giveUsername(){
        let token = cookie.load('Quizio')
        let obj = jwt.verify(token, JWT_KEY);
        if(obj) return obj.email;
        return null
    }
}
