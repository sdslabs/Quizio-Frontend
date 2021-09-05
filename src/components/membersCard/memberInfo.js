import React from 'react'
import Btn from '../buttons/btn'
import GroupIcon from '../groupsCard/groupIcon';
import { updateGroup } from '../../api/groups'

const MemberInfo = (props) => {

    const removeUserFromGroup = () => {
        updateGroup(props.groupId, { removeMembers: props.id })
            .then(res => {
                res = res.data
                if (res.success && res.status) {
                    window.location.reload()
                }
            })
    }

    const addAdmin = () => {
        groupsAPI.updateGroup(props.groupId, { addAdmins: props.id })
            .then(res => {
                res = res.data
                if (res.success && res.status) {
                    window.location.reload()
                }
            })
    }

    const removeAdmin = () => {
        groupsAPI.updateGroup(props.groupId, { removeAdmins: props.id })
            .then(res => {
                res = res.data
                if (res.success && res.status) {
                    window.location.reload()
                }
            })
    }

    return (
        <div className={props.className ? "group-info flex " + props.className : "group-info flex"}>
            <GroupIcon className='group-icon-info' width='100' height='100' />
            <div className="group-info-content">
                <div className="member-info-head-container flex flex-start">
                    <div className="group-info-heading">{props.name}</div>
                    {!props.isAdmin && <button className="members-make-admin" onClick={addAdmin}>Make Admin</button>}
                    {props.isAdmin && <button className="members-make-admin" onClick={removeAdmin}>Remove Admin</button>}
                </div>

                <div className="group-info-sub-heading">{props.bio}</div>
            </div>
            <div className={"join-btn "}>
                <Btn type="round" html=" - " className={"group-add-btn "} onClick={removeUserFromGroup}></Btn>
            </div>
        </div>

    )

}

export default MemberInfo