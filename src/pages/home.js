import React, { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { checkAuth } from '../api/auth'
import Cover from '../components/svg/cover'

const Home = () => {
    const [oauth, setOauth] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)
    const [authLoaded, setAuthLoaded] = useState(false)

    useEffect(() => {
        handleCheckAuth()
    }, [])

    const handleCheckAuth = () => {
        checkAuth()
            .then((data) => {
                console.log(data)
                if (data.success) {
                    data.oauth && setOauth(true)
                    data.authenticated && setLoggedIn(true)
                    setAuthLoaded(true)
                }
            })

    }

    return (
        <>
            {authLoaded ? loggedIn ? (<></>
                // <div>
                //     <Header authenticated={authenticated} handleLogOut={handleLogOut} />
                //     <div className='flex column space-around home-res'>
                //         <div className='flex space-evenly lower-res'>
                //             <div className='flex table-container'>
                //                 <TableHeading value='Ongoing Quizzes' />
                //                 {ongoingQuizzes.length ?
                //                     <Table headRow='true' quizzes={ongoingQuizzes} past={false} /> :
                //                     <NoQuizzes showImg={true} section='No Ongoing Quizzes' />
                //                 }
                //                 <TableHeading value='Upcoming Quizzes' />
                //                 {upcomingQuizzes.length ?
                //                     <Table headRow='true' quizzes={upcomingQuizzes} past={false} /> :
                //                     <NoQuizzes showImg={true} section='No Upcoming Quizzes' />
                //                 }
                //                 <TableHeading value='Past Quizzes' />
                //                 {pastQuizzes.length ?
                //                     <Table headRow='true' quizzes={pastQuizzes} past={true} /> :
                //                     <NoQuizzes showImg={true} section='No Past Quizzes' />
                //                 }
                //             </div>
                //             <GroupsCard home={true} groups={groups} />
                //         </div>
                //     </div>
                // </div>

            ) : <Cover oauth={oauth} /> : (
                <div className="spinner-border text-warning" role="status">
                </div>
            )}
        </>
    )
}

export default Home