import axiosInstance from './axiosInstance'

export const getUser = async (userId) => {
    console.log("/users/:username")
    return axiosInstance.get(`/users/${userId}`)
        .then(res => {
            return res.data
        })
}