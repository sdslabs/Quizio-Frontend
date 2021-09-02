import { axiosInstance, requestInterceptor } from './axiosInstance'
import config from '../config/config.js';


let username = localStorage.getItem('username'); // DOUBT


const baseURL = config.API.baseURL + "users/" + username;
const postURL = config.API.baseURL + "users/fetchusers/";

requestInterceptor;

export default class Users {
    static fetchUserData() {
        return axiosInstance.get(baseURL + '?userGroups=true&userQuizzes=true&registeredQuizzes=true')
            .then(res => {
                const body = res.data
                const error = body.error
                if (error) throw error
                else {
                    return body.userData
                }
            }).catch(err => {
                return err
            })
    }

    fetchUserDatafromUsersArray(usersEmail) {
        return axiosInstance.post(postURL, { usersEmail })
            .then(res => {
                const body = res.data
                const error = body.error
                if (error) throw error
                else {
                    return body.usersData
                }
            }).catch(err => {
                return err
            })
    }
}
