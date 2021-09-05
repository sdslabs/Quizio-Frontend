import axiosInstance from './axiosInstance'
import requestInterceptor from './requestInterceptor'
import responseInterceptor from './responseInterceptor'

export const fetchGroups = () => {
    return axiosInstance.get(`/groups/?all=true`, { json: true })

}

export const fetchGroupsForUser = () => {
    return axiosInstance.get(`/groups`, { json: true })
}


export const createGroup = (groupName, creator, description) => {
    let postdata = {
        groupId: groupName,
        creator: creator,
        description: description
    }
    return axiosInstance.post(`/groups?create=true'`, postdata)
    // .then((res) => {
    //     const body = res.data
    //     const error = body.error || null
    //     if (error) throw error
    //     else return body
    // })
    // .catch(err => {
    //     console.log(err)
    // })
}

export const joinGroup = (groupId, accessCode) => {
    return axiosInstance.get(`/groups?join=${groupId}&code=${accessCode ? accessCode : ''}`, { json: true })
}
export const leaveGroup = (groupId) => {
    return axiosInstance.get(`/groups?leave=${groupId}`)
}
export const fetchGroupMembers = (groupId) => {
    return axiosInstance.get(`/groups/${groupId}/members`)
}
export const updateGroup = (groupId, update) => {
    let postdata = {}

    /// this is unnecessary, need to update handler in backend
    if (update.removeMembers) {
        postdata['removeMembers'] = [update.removeMembers]
    }
    if (update.addAdmins) {
        postdata['addAdmins'] = [update.addAdmins]
    }
    if (update.removeAdmins) {
        postdata['removeAdmins'] = [update.removeAdmins]
    }
    if (update.addMembers) {
        postdata['addMembers'] = [update.addMembers]
    }
    return axiosInstance.post(`/groups/${groupId}`, postdata)
}
