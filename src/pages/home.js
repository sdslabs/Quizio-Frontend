// libs
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

// components
import Header from '../components/header'
import Cover from '../components/svg/cover'

import Table from '../components/tables/index'
import TableHeading from '../components/tables/heading'
import GroupsCard from '../components/groupsCard/index'
import NoQuizzes from '../components/noQuizzes'

// apis
import { checkAuthAtHome, logout } from "../api/auth"
import { fetchGroupsForUser } from "../api/groups";

// styles
import '../styles/partials/_base.scss'
import '../styles/modules/home.scss'


const Home = (props) => {
    let history = useHistory()
    const [authenticated, setAuthenticated] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [oauth, setOauth] = useState(false)
    const [upcomingQuizzes, setUpcomingQuizzes] = useState([])
    const [ongoingQuizzes, setOngoingQuizzes] = useState([])
    const [pastQuizzes, setPastQuizzes] = useState([])
    const [groups, setGroups] = useState([])
    const [quizData, setQuizData] = useState([])

    useEffect(() => {
        handleGetUserInfo()
    }, [])

    const handleGetUserInfo = async () => {
        let res = await checkAuthAtHome()
        res = res.data
        console.log(res)

        setAuthenticated(res.authenticated)
        setOauth(res.oauth)
        setRegistered(res.registered)
        if (res.quizData) {
            for (let i = 0; i < res.quizData.length; i++) {
                res.quizData[i].startTime = new Date(res.quizData[i].startTime)
                res.quizData[i].endTime = new Date(res.quizData[i].endTime)
                res.quizData[i].duration = (res.quizData[i].endTime - res.quizData[i].startTime) / (1000 * 60)
            }
        }
        setQuizData(res.quizData)
        if (res.success) {
            quizData.forEach(quiz => {
                let startTime = quiz.startTime.getTime()
                let endTime = quiz.endTime.getTime()

                if (startTime > Date.now()) {
                    setUpcomingQuizzes([...upcomingQuizzes, quiz])
                } else if (startTime < Date.now() && endTime >= Date.now()) {
                    setOngoingQuizzes([...ongoingQuizzes, quiz])
                } else {
                    setPastQuizzes([...this.state.pastQuizzes, quiz])
                }
            })
        }
        /// [TODO] 
        // change the quizzes api function to pick the username by default
        //change quizV2 so that it does not need the username parameter
        let username = localStorage.getItem('username')
        let groups = await fetchGroupsForUser(username)

        setGroups(groups.data.groups)
    }

    const handleLogOut = () => {
        console.log("log out clicked!")
        logout()
        history.push('/')
    }

    return (
        <>
            {authenticated || true ? (
                <div>
                    <Header authenticated={authenticated} handleLogOut={handleLogOut} />
                    <div className='flex column space-around home-res'>
                        <div className='flex space-evenly lower-res'>
                            <div className='flex table-container'>
                                <TableHeading value='Ongoing Quizzes' />
                                {this.state.ongoingQuizzes.length ?
                                    <Table headRow='true' quizzes={ongoingQuizzes} past={false} /> :
                                    <NoQuizzes showImg={true} section='No Ongoing Quizzes' />
                                }
                                <TableHeading value='Upcoming Quizzes' />
                                {this.state.upcomingQuizzes.length ?
                                    <Table headRow='true' quizzes={upcomingQuizzes} past={false} /> :
                                    <NoQuizzes showImg={true} section='No Upcoming Quizzes' />
                                }
                                <TableHeading value='Past Quizzes' />
                                {this.state.pastQuizzes.length ?
                                    <Table headRow='true' quizzes={this.state.pastQuizzes} past={true} /> :
                                    <NoQuizzes showImg={true} section='No Past Quizzes' />
                                }
                            </div>
                            <GroupsCard home={true} groups={this.state.groups} />
                        </div>
                    </div>
                </div>

            ) : <Cover oauth={oauth} />}
        </>
    );
}
export default Home


//     componentDidMount() {

//             return (
//                 <div>
//                     <Header logo loginStatus={true} loginFunction={this.login} />
//                     <div className='flex column space-around home-res'>
//                         <div className='flex space-evenly lower-res'>
//                             <div className='flex table-container'>
//                                 <TableHeading value='Ongoing Quizzes' />
//                                 {this.state.ongoingQuizzes.length ?
//                                     <Table headRow='true' quizzes={this.state.ongoingQuizzes} past={false} /> :
//                                     <NoQuizzes showImg={true} section='No Ongoing Quizzes' />
//                                 }
//                                 <TableHeading value='Upcoming Quizzes' />
//                                 {this.state.upcomingQuizzes.length ?
//                                     <Table headRow='true' quizzes={this.state.upcomingQuizzes} past={false} /> :
//                                     <NoQuizzes showImg={true} section='No Upcoming Quizzes' />
//                                 }
//                                 <TableHeading value='Past Quizzes' />
//                                 {this.state.pastQuizzes.length ?
//                                     <Table headRow='true' quizzes={this.state.pastQuizzes} past={true} /> :
//                                     <NoQuizzes showImg={true} section='No Past Quizzes' />
//                                 }
//                             </div>
//                             <GroupsCard home={true} groups={this.state.groups} />
//                         </div>
//                     </div>
//                 </div>
//             )
//         }
//     }
// }


