import React, { Component, useEffect, useState } from 'react'
import Header from '../components/header'
import CreatedQuizTable from '../components/createdQuizTable'
import GroupNameBoard from '../components/groupNameBoard'
import GroupName from '../components/groupName'
import GroupsCard from '../components/groupsCard/index'
import { fetchUserData } from '../api/user'

import UserDashboard from '../components/userDashboard'
import '../styles/modules/userpage.scss'


const Users = (props) => {
    const [createdQuizData, setCreatedQuizData] = useState([])
    const [groupData, setGroupData] = useState([])
    const [userData, setUserData] = useState(null)
    const [registeredQuizzes, setRegisteredQuizzes] = useState(null)


    const handleFetchUserData = () => {
        fetchUserData()
            .then((res) => {
                userData = res.data.userData
                setUserData(userData)
                setGroupData(userData.groups)
                setCreatedQuizData(userData.publicQuizzes)
                setRegisteredQuizzes(userData.registeredQuizzes)
            })
    }
    useEffect(() => {
        handleFetchUserData()
    }, [])


    return (
        <div>
            <Header logo profile={true} noProfile={true} />
            <UserDashboard
                name={userData ? userData.name : "Not Found"}
                bio={userData ? userData.bio : "Not Found"}
                username={userData ? userData.username : "Not Found"}
                lenGroups={groupData}
                lenCreatedQuizzes={createdQuizData}
                lenRegisteredQuizzes={registeredQuizzes}
            ></UserDashboard>
            <div className="container-for-dashb">
                <div className="created-quiz-div">
                    <CreatedQuizTable data={(createdQuizData).length > 0 ? createdQuizData : null}></CreatedQuizTable>
                </div>
                <div className="groups-div">
                    <GroupNameBoard groups={(groupData).length > 0 ? groupData : null} />
                </div>
            </div>

        </div>
    )

}
export default Users
