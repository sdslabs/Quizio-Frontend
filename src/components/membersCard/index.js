import React, { Component } from 'react'
import MemberInfo from './memberInfo'
import '../../styles/modules/groupsCard.scss'
import '../../styles/modules/membersCard.scss'

export default class MembersCard extends Component {
    render() {
        let members  = this.props.members
        let admins = this.props.admins
         
        var adminset = new Set();
        admins.map(item => adminset.add(item));
        return (
            <div className="groupsCard flex wrap">
            {   
                members.map((member, index) => {
                    let className = ''
                    if (members.length > 1 && members.length%2 && index === members.length-1) {
                        className += 'unpaired-flex-item'
                    }

                    return (
                        <MemberInfo
                            name={member.name}
                            bio={member.bio}
                            id = {member._id}
                            key={index}
                            className={className}
                            groupId = {this.props.groupId}
                            isAdmin = {adminset.has(member._id) === true}
                        />
                    )
                })
            }
            </div>
        )    
    }
}