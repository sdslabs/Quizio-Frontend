import React, { useEffect, useState } from "react"
import Cookies from 'universal-cookie';
import { checkAuth, login, logout } from '../api/auth'
import { getUser } from "../api/user";
import Cover from '../components/svg/cover'
import Header from "../components/header"
import config from "../config/config";
import { useHistory } from "react-router";

const Home = () => {
    let history = useHistory()
    const [authLoaded, setAuthLoaded] = useState(false) // true when /auth returns the auth status
    const [oauth, setOauth] = useState(false)           // true when logged in to accounts (`sdslabs` cookie is set)
    const [loggedIn, setLoggedIn] = useState(false)     // true when logged in to quizio   (`token` cookie is set and `userId` is set)
    const [showModal, setShowModal] = useState(false);  // toggle to show the login modal
    const [userId, setUserId] = useState("")            // userId
    const [userName, setUserName] = useState("")        // username

    /// login with SDSLabs Oauth
    const continueWithSDSLabs = () => {
        if (!oauth) {
            // not logged into accounts, go to arceus and get sdslabs cookie
            window.location = `${config.AUTH.accountURL}?redirect=${config.AUTH.redirectURL}`
        } else {
            // logged into accounts, login in to quizio
            login()
                .then((status) => {
                    if (status) {
                        console.log("fully logged in!")
                        setShowModal(false)
                        setLoggedIn(true)
                    }
                })
        }
    }

    const handleLogout = () => {
        setLoggedIn(false)
        setUserId("")
        setUserName("")
        logout()
    }

    const handleCheckAuth = async () => {

        let authData = await checkAuth()
        if (authData.success) {
            authData.oauth && setOauth(true)
            authData.authenticated && setLoggedIn(true)
            setAuthLoaded(true)
            if (authData.oauth) {

                let loginStatus = await login()
                if (loginStatus) {
                    // logged into accounts but not quizio
                    console.log("fully logged in!")
                    setLoggedIn(true)
                    let userId = localStorage.getItem('userId')
                    setUserId(userId)

                    await getUser(userId)
                    let userName = localStorage.getItem('userName')
                    setUserName(userName)

                }

            }
        }
    }

    useEffect(() => {
        handleCheckAuth()
    }, [])

    useEffect(() => {
        console.log("oauth: ", oauth)
    }, [oauth])

    useEffect(() => {
        console.log("loggedIn: ", loggedIn)
    }, [loggedIn])

    useEffect(() => {
        console.log("authLoaded: ", authLoaded)
    }, [authLoaded])

    return (
        <>
            {authLoaded ? loggedIn ? (<>
                <Header
                    loggedIn={loggedIn}
                    givingQuiz={false}
                    userName={userName}
                    handleLogout={handleLogout}
                />
                {/* <div className='flex column space-around home-res'>
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
                </div> */}
            </>
            ) : <Cover
                showModal={showModal}
                setShowModal={setShowModal}
                continueWithSDSLabs={continueWithSDSLabs}
            /> : (
                <div className="spinner-border text-warning" role="status">
                </div>
            )}
        </>
    )
}

export default Home