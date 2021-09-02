import { axiosInstance, requestInterceptor } from './axiosInstance'
import config from '../config/config'

// const config = require('../config/config.json')

const baseURL = config.API.baseURL + 'groups'
// require('./interceptor');
// require('./headerInterceptor');

export default class Groups {
    constructor(){
        this.id = 'id'
    }
    fetchGroups() {
        return axiosInstance.get(baseURL + '?all=true', {json: true})
        .then(res => {
            const body = res.data
            const error = body.error || null
            if (error) throw error
            else return body.groups
        })
        .catch(error => {
            console.log(error)
        })
    }

    fetchGroupsForUser() {
        return axiosInstance.get( baseURL, {json: true})
        .then((res) => {
            const body = res.data
            const error = body.error || null
            if (error) throw error
            else return body.groups
        })
        .catch(err => {
            console.log(err)
        })
    }

    createGroup(groupName , creator , description){
        let postdata = {
            groupId : groupName,
            creator : creator,
            description : description
        }
        return axiosInstance.post( baseURL + '?create=true', postdata)
        .then((res) => {
            const body = res.data
            const error = body.error || null
            if (error) throw error
            else return body
        })
        .catch(err => {
            console.log(err)
        })
    }
    joinGroup(groupId , accessCode) {
        if(!accessCode)accessCode = ''
        return axiosInstance.get(baseURL + '?join=' + groupId + '&code=' + accessCode, {json: true})
        .then(res => {
            const body = res.data
            const error = body.error || null
            if (error) throw error
            else return body.join
        })
        .catch(error => {
            console.log(error)
        })
    }
    leaveGroup(groupId){
        return axiosInstance.get(baseURL + '?leave=' + groupId)
        .then(res => {
            const body = res.data
            const error = body.error || null
            if (error) throw error
            else return body.leave
        })
        .catch(error =>{
            console.log(error)
        })
    }
    fetchGroupMembers(groupId){
        return axiosInstance.get(baseURL + "/" +  groupId + "/members")
        .then(res =>{
            let body = res.data
            const error = body.error || null
            if (error) throw error
            else return body
        })
        .catch(error =>{
            console.log(error)
        })
    }
    updateGroup(groupId , update){
        let postdata = {
        }
        if(update.removeMembers){
            postdata['removeMembers'] = [update.removeMembers]
        }
        if(update.addAdmins){
            postdata['addAdmins'] = [update.addAdmins]
        }
        if(update.removeAdmins){
            postdata['removeAdmins'] = [update.removeAdmins]
        }
        if(update.addMembers){
            postdata['addMembers'] = [update.addMembers]
        }
        return axiosInstance.post(baseURL + "/" + groupId , postdata)
        .then(res =>{
            let body = res.data
            const error = body.error || null
            if (error) throw error
            else return body
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}
