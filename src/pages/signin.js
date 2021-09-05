import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import cookie from 'react-cookies'

import Header from '../components/header'
import { checkAuthAtHome, login } from '../api/auth'


const Signin = () => {
    let history = useHistory()

    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        console.log("login: ",)

        login()
            .then((res) => {
                res = res.data
                // console.log(res)

                // if (res.success) {
                //     localStorage.setItem('username', res.username);
                //     cookie.save('token', res.token, { path: '/' })
                //     setAuthenticated(true)
                //     history.push("/")
                // }
            })


        // checkAuthAtHome()
        //     .then((res) => {
        //         res = res.data
        //         console.log("auth: ", !res.registered)
        //         // if (!res.registered) {
        //         //     console.log("not registered!")
        //         //     history.push("/signup")
        //         // }
        //         login()
        //             .then((res) => {
        //                 res = res.data

        //                 if (res.success) {
        //                     localStorage.setItem('username', res.username);
        //                     cookie.save('token', res.token, { path: '/' })
        //                     setAuthenticated(true)
        //                     history.push("/")
        //                 }
        //             })
        //     })
    }, [])

    return (
        <div>
            <Header authenticated={authenticated} />
            {/* The rest of the home goes here. We can paste it or make a new component and render it. */}
        </div>
    )

}

export default Signin
