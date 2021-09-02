import axiosInstance from './axiosInstance'
import requestInterceptor from './requestInterceptor'
import responseInterceptor from './responseInterceptor'


export const fetchQuizResponse = (id, query) => {
    return axiosInstance.get(`/responses/${id}/${query}`)
    // .then((res) => {
    //     const error = res.data.error
    //     if (error) throw error
    //     return res
    // })
    // .catch((err) => {
    //     return err
    // })
}


export const fetchQuizResponseForUser = (id, userId) => {
    return axiosInstance.get(`/responses/${id}/user?username=${userId}`)
    // .then(res => {
    //     const body = res.data
    //     const error = body.error
    //     if (error) throw error
    //     return body
    // }).catch(err => {
    //     return err
    // })
}

export const updateMarks = (update) => {
    return axiosInstance.post(`/responses/${id}/user?username=${userId}`, { update })
    // .then(res => {
    //     const body = res.data
    //     const error = body.error
    //     if (error) throw error
    //     return body
    // }).catch(err => {
    //     return err
    // })
}