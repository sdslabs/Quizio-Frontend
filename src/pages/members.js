import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import { fetchGroupMembers } from '../api/groups'
import MembersCard from '../components/membersCard'
import MembersCardHeader from '../components/membersCard/header'


const Members = (props) => {

    const [members, setMembers] = useState([])
    const [admins, setAdmins] = useState([])
    const [groupId, setGroupId] = useState(props.match.params.groupId)


    const handleGetMembers = () => {
        fetchGroupMembers(groupId)
            .then(res => {
                res = res.data
                setMembers(res.groupMembers.members)
                setAdmins(res.groupMembers.admins)
            })

    }

    useEffect(() => {
        handleGetMembers()

    }, [])

    return (
        <div>
            <Header logo />
            <MembersCardHeader numMembers={(members).length} groupId={props.match.params.groupId} />
            <MembersCard members={members} groupId={props.match.params.groupId} admins={admins} />
        </div>

    )

}

export default Members