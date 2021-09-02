import axiosInstance from './axiosInstance'
import requestInterceptor from './requestInterceptor';

let username = localStorage.getItem('username'); // DOUBT

export const fetchUserData = () => {
    return axiosInstance.get(`/users/${username}?userGroups=true&userQuizzes=true&registeredQuizzes=true`)
    // .then(res => {
    //     const body = res.data
    //     const error = body.error
    //     if (error) throw error
    //     else{
    //         return body.userData
    //     }
    // }).catch(err => {
    //     return err
    // })
}

export const fetchUserDatafromUsersArray = (usersEmail) => {
    return axiosInstance.post(`/users/fetchusers/`, { usersEmail })
    // .then(res => {
    //     const body = res.data
    //     const error = body.error
    //     if (error) throw error
    //     else{
    //         return body.usersData
    //     }
    // }).catch(err => {
    //     return err
    // })
}