import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import { fetchGroupsForUser, fetchGroups } from '../api/groups'
import GroupsCard from '../components/groupsCard'
import GroupsCardHeader from '../components/groupsCard/header'

const Groups = (props) => {

    const [groups, setGroups] = useState([])
    const [pageState, setPageState] = useState(0)

    const fetchData = (toggle = 0) => {
        if (pageState ^ toggle) {
            fetchGroupsForUser()
                .then((res) => {
                    let userGroups = res.data.groups
                    setPageState(pageState ^ toggle)
                    setGroups(userGroups)
                })
        } else {
            fetchGroups()
                .then((res) => {
                    let groupData = res.data.groups
                    fetchGroupsForUser()
                        .then((res) => {
                            let userGroups = res.data.groups
                            setPageState(pageState ^ toggle)
                            setGroups(groupData.filter(({ _id: id1 }) => !userGroups.some(({ _id: id2 }) => id2 === id1)))
                        })
                })
        }
    }

    const togglePageState = () => {
        fetchData(1)
    }


    useEffect(() => {
        fetchData()
    }, [])


    return (
        <div>
            <Header logo />
            <GroupsCardHeader togglePageState={togglePageState} state={pageState} />
            <GroupsCard groups={groups} state={pageState} />
        </div>

    )

}

export default Groups
