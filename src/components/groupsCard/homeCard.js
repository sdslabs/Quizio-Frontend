import React from 'react'
import GroupIcon from './groupIcon';
import '../../styles/modules/groupsCard.scss'

const HomeCard = (props) => {
    return (
        props.groups[0].map((group) => (
            <div className="group-card-home flex">
                <GroupIcon className='group-icon' width='40' height='40' />
                <div className="group-card-home-heading">{group.groupId}</div>
            </div>
        )
        )
    )
}


export default HomeCard