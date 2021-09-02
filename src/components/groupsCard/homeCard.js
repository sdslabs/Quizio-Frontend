import React, { Component } from 'react'
import GroupInfo from './groupInfo'
import '../../styles/modules/groupsCard.scss'
import GroupIcon from './groupIcon';

export default class HomeCard extends Component {
    render() {
        let groups = this.props.groups
        return (
            groups[0].map((group) => {
                return (
                    <div className="group-card-home flex">
                        <GroupIcon className='group-icon' width ='40' height='40'/>
                        <div className="group-card-home-heading">{group.groupId}</div>
                    </div>
                )
            })
        )    
    }
}