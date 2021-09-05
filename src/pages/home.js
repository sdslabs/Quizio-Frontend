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

    const [loggedIn, setLoggedIn] = useState(false) // true if user is logged into quizio
    const [oauth, setOauth] = useState(false) // true if user is logged into accounts
    const [registered, setRegistered] = useState(false) // TODO: what is this?

    const [upcomingQuizzes, setUpcomingQuizzes] = useState([])
    const [ongoingQuizzes, setOngoingQuizzes] = useState([])
    const [pastQuizzes, setPastQuizzes] = useState([])
    const [groups, setGroups] = useState([])
    const [quizData, setQuizData] = useState([])

    useEffect(() => {
        handleGetUserInfo()
    }, [])

    const handleGetUserInfo = () => {
        checkAuthAtHome()
            .then((auth) => {
                setOauth(auth.oauth)
                setLoggedIn(auth.loggedIn)
                setRegistered(auth.registered)

                if (auth.success && auth.quizData) {
                    // the user is authenticated to view the public quizzes

                    // TODO: this should happen in backend!
                    auth.quizData.forEach(quiz => {
                        quiz.startTime = new Date(quiz.startTime)
                        quiz.endTime = new Date(quiz.endTime)
                        quiz.duration = (quiz.endTime - quiz.startTime) / (1000 * 60)

                        let startTime = quiz.startTime.getTime()
                        let endTime = quiz.endTime.getTime()

                        if (startTime > Date.now()) {
                            setUpcomingQuizzes([...upcomingQuizzes, quiz])

                        } else if (startTime < Date.now() && endTime >= Date.now()) {
                            setOngoingQuizzes([...ongoingQuizzes, quiz])

                        } else {
                            setPastQuizzes([...this.state.pastQuizzes, quiz])
                        }
                        console.log(quiz)
                    });

                    setQuizData(auth.quizData)
                    // TODO: change the quizzes api function to pick the username by default
                    // change quizV2 so that it does not need the username parameter
                    let username = localStorage.getItem('username')
                    let groups = fetchGroupsForUser(username || "")
                    groups.data.groups && setGroups(groups.data.groups)
                }
            })
    }

    const handleLogOut = () => {
        logout()
        history.push('/')
    }

    return (
        <>
            {loggedIn ? (
                <div>
                    <Header loggedIn={loggedIn} handleLogOut={handleLogOut} />
                    <div className='flex column space-around home-res'>
                        <div className='flex space-evenly lower-res'>
                            <div className='flex table-container'>
                                <TableHeading value='Ongoing Quizzes' />
                                {ongoingQuizzes.length ?
                                    <Table headRow='true' quizzes={ongoingQuizzes} past={false} /> :
                                    <NoQuizzes showImg={true} section='No Ongoing Quizzes' />
                                }
                                <TableHeading value='Upcoming Quizzes' />
                                {upcomingQuizzes.length ?
                                    <Table headRow='true' quizzes={upcomingQuizzes} past={false} /> :
                                    <NoQuizzes showImg={true} section='No Upcoming Quizzes' />
                                }
                                <TableHeading value='Past Quizzes' />
                                {pastQuizzes.length ?
                                    <Table headRow='true' quizzes={pastQuizzes} past={true} /> :
                                    <NoQuizzes showImg={true} section='No Past Quizzes' />
                                }
                            </div>
                            <GroupsCard home={true} groups={groups} />
                        </div>
                    </div>
                </div>

            ) : <Cover oauth={oauth} />}
        </>
    );
}
export default Home