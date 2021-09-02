import React, { Component } from 'react'
import Header from '../components/header'
import usersAPI from '../api/user'
import CreatedQuizTable from '../components/createdQuizTable'
import GroupNameBoard from '../components/groupNameBoard'
import GroupName from '../components/groupName'
import GroupsCard from '../components/groupsCard/index'

import UserDashboard from '../components/userDashboard'
import '../styles/modules/userpage.scss'


class Users extends Component {
constructor(props)
{ 
    super(props);
    usersAPI.fetchUserData = usersAPI.fetchUserData.bind(this)
    this.render = this.render.bind(this)
    this.state = {
        createdQuizData : [],
        userData : null,
        groupData : [],
        registeredQuizzes : null
    }
}
componentDidMount()
{
    usersAPI.fetchUserData().then((userData) =>{
        this.setState({
            userData : userData,
            groupData : userData.groups,
            createdQuizData : userData.publicQuizzes,
            registeredQuizzes : userData.registeredQuizzes
        })
    })
}

    render() {
        return (
            <div>
                <Header logo profile={true} noProfile = {true}/>
                <UserDashboard  
                        name = {this.state.userData ? this.state.userData.name : "Not Found"}
                        bio = {this.state.userData ? this.state.userData.bio : "Not Found"}
                        username = {this.state.userData ? this.state.userData.username : "Not Found"}
                        lenGroups = {this.state.groupData}
                        lenCreatedQuizzes = {this.state.createdQuizData}
                        lenRegisteredQuizzes = {this.state.registeredQuizzes}
                ></UserDashboard>
                <div className = "container-for-dashb">
                    <div className = "created-quiz-div">
                        <CreatedQuizTable data = {(this.state.createdQuizData).length > 0  ? this.state.createdQuizData : null}></CreatedQuizTable>  
                    </div>
                <div className = "groups-div">
                    <GroupNameBoard groups = {(this.state.groupData).length > 0 ? this.state.groupData : null} />
                </div>
                </div>
                
            </div>
        )
    }
}
export default Users
