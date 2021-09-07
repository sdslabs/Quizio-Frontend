import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import config from '../config/config'

import { Container } from 'react-bootstrap'

import Btn from '../components/buttons'
import { checkAuth, login } from '../api/auth'


const Signin = () => {
    let history = useHistory()

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

    const continueWithSDSLabs = () => {


        if (!oauth) {
            // not logged into accounts, go to arceus and get sdslabs cookie
            window.location = `${config.AUTH.accountURL}?redirect=${config.AUTH.redirectURL}`
        } else {
            // logged into accounts, login in to quizio
            login()
                .then(status => {
                    status && history.push('/')
                })
        }

    }

    return (
        <>
            {authLoaded ? (
                <Container fluid className="h-100 d-flex align-items-center justify-content-center">
                    <Btn className="submit-btn-cover m-5 p-2"
                        html="Continue with SDSLabs"
                        onClick={continueWithSDSLabs}
                    />
                </Container>
            ) : (
                <div className="spinner-border text-warning" role="status">
                </div>
            )}
        </>
    )
}

export default Signin
