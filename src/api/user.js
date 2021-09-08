import axiosInstance from './axiosInstance'

export const getUser = async (userId) => {
    console.log("/users/:username")
    return axiosInstance.get(`/users/${userId}`)
        .then(res => {
            let data = res.data
            console.log(data)
            localStorage.setItem('userName', data.userData.name)
        })
}