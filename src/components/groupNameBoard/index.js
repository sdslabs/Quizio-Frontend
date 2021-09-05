import React from 'react'
import '../../styles/modules/groupNameBoard.scss'
import GroupName from '../groupName';

const GroupNameBoard = (props) => {

    return (<>
        <div className="your-grp">
            Your Groups
        </div>
        <div className="no-groups-placeholder-container">
            <div className="no-groups-placeholder">You are not in any groups</div>
        </div>
        {props.groups && props.groups.map((group) => {
            return (
                <GroupName name={group.groupId} />
            )
        })
        }
    </>)
}

export default GroupNameBoard