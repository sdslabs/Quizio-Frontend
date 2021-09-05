import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'

import Header from '../components/header'
import { checkAuthAtHome, login } from '../api/auth'


const Signin = () => {
    let history = useHistory()

    const [authenticated, setAuthenticated] = useState(false)

    const signInWithSDSLabs = () => {

        checkAuthAtHome()
            .then((auth) => {
                if (!auth.registered) {
                    // user not registered in quizio
                    console.log("not registered!")
                    history.push(`/signup`)
                } else {
                    // user is registered, so log them in
                    login()
                        .then((auth) => {
                            if (auth.success) {
                                setAuthenticated(true)
                                console.log("login!")
                                history.push('/')
                            }
                        })
                }
            })
    }

    return (
        <div>
            <Header authenticated={authenticated} />
            <button onClick={signInWithSDSLabs}>Sign In with SDSLabs</button>
            {/* The rest of the home goes here. We can paste it or make a new component and render it. */}
        </div>
    )

}

export default Signin
