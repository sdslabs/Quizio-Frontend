import React, { Component } from 'react'
import Btn from '../buttons/btn'
import GroupIcon from '../groupsCard/groupIcon';
import Modal from '../popup/index'
import groupsAPI from '../../api/groups'

export default class MemberInfo extends Component {
    constructor(props){
        super(props)
        this.groupsAPI = new groupsAPI()
        this.removeUserFromGroup = this.removeUserFromGroup.bind(this)
        this.addAdmin = this.addAdmin.bind(this)
        this.removeAdmin = this.removeAdmin.bind(this)
    }
    removeUserFromGroup(){
        let removeMembers = this.props.id
        this.groupsAPI.updateGroup(this.props.groupId , {removeMembers : removeMembers} ).then(res =>{
            if(res.success && res.status){
                window.location.reload()
            }
        })
    }

    addAdmin(){
        let addAdmins = this.props.id
        this.groupsAPI.updateGroup(this.props.groupId , {addAdmins : addAdmins}).then(res=>{
            if(res.success && res.status){
                window.location.reload()
            }
        })
    }

    removeAdmin(){
        let removeAdmins = this.props.id  
        this.groupsAPI.updateGroup(this.props.groupId , {removeAdmins : removeAdmins}).then(res=>{
            if(res.success && res.status){
                window.location.reload()
            }
        })
    }
    render() {
        let className = "group-info flex "
        if (this.props.className) {
            className += this.props.className
        } 
        return (
            <div className={className}>
            <GroupIcon className='group-icon-info' width ='100' height='100'/>
                <div className="group-info-content">
                   <div className = "member-info-head-container flex flex-start">
                        <div className="group-info-heading">{this.props.name}</div>
                        {!this.props.isAdmin && <button className = "members-make-admin" onClick = {this.addAdmin}>Make Admin</button>}
                        {this.props.isAdmin && <button className = "members-make-admin" onClick = {this.removeAdmin}>Remove Admin</button>}
                   </div>
                    
                    <div className="group-info-sub-heading">{this.props.bio}</div>
                </div>
                <div className = {"join-btn "}>
                    <Btn type = "round" html = " - " className={"group-add-btn "} onClick = {this.removeUserFromGroup}></Btn>
                </div>
            </div>
            
        )
    }
}