import axios from 'axios'
const config = require('../config/config.json');
let username = localStorage.getItem('username');

require('./headerInterceptor');
const baseURL = config.API.baseURL + "users/" + username;
const postURL = config.API.baseURL + "users/fetchusers/";

export default class Users
{
    static fetchUserData(){
        return axios.get(baseURL + '?userGroups=true&userQuizzes=true&registeredQuizzes=true')
        .then(res => {
            const body = res.data
            const error = body.error
            if (error) throw error
            else{
                return body.userData
            }
        }).catch(err => {
            return err
        })
    }

    fetchUserDatafromUsersArray(usersEmail){
        return axios.post(postURL, { usersEmail })
        .then(res => {
            const body = res.data
            const error = body.error
            if (error) throw error
            else{
                return body.usersData
            }
        }).catch(err => {
            return err
        })
    }
}
