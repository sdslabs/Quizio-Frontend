import axiosInstance from './axiosInstance'
import requestInterceptor from './requestInterceptor'
import responseInterceptor from './responseInterceptor'

export const isRegisteredForQuiz = (id, userId) => {
    return axiosInstance.get(`/registrations/${id}/${userId}`)
}

export const registerForQuiz = (id, userId, accessCode) => {
    return userId ? axiosInstance.post(`/registrations/${id}`, { accessCode: accessCode }) : { success: false }
}

export const exitQuiz = (id, userId) => {
    return axiosInstance.post(`/registrations/${id}/exitQuiz/${userId}`)
    // .then(res => {
    //     const body = res.data
    //     const error = body.error
    //     if (error) throw error
    //     return body
    // }).catch(err => {
    //     return err
    // })
}