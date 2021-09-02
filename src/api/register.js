import axiosInstance from './axiosInstance'
import requestInterceptor from './requestInterceptor'
import responseInterceptor from './responseInterceptor'

export const isRegisteredForQuiz = (id, userId) => {
    return axiosInstance.get(`/registrations/${id}/${userId}`)
    // .then((res) => {
    //     const error = res.data.error
    //     if (error) throw error
    //     return res
    // })
    // .catch((err) => {
    //     return err
    // })
}

export const registerForQuiz = (id, userId, accessCode) => {
    if (!userId) {
        return { success: false }
    } else {
        return axiosInstance.post(`/registrations/${id}`, { accessCode: accessCode })
            // .then(res => {
            //     const body = res.data
            //     const error = body.error
            //     if (error) throw error
            //     return body
            // }).catch(err => {
            //     return err
            // })
    }
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