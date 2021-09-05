import React, { Component, useState } from 'react'
import Header from '../components/header'
import SignupForm from '../components/signupform'
import Modal from '../components/popup'
import Btn from '../components/buttons/btn.js'
import { signup } from '../api/auth'
import '../styles/modules/signupForm.scss'

const Signup = () => {
    const [user, setUser] = useState({
        username: "",
        fname: "",
        lname: "",
        bio: "",
        num: "",
        org: "",
        enrl: "",
        course: "",
        codeforces: "",
        codechef: "",
        github: "",
    })

    const [submitState, setSubmitState] = useState(0)
    const [modalActive, setModalActive] = useState(false)
    const [modalMsg, setModalMsg] = useState("")


    const handleChange = (event) => {
        let userData = { ...user };
        const prop = event.target.name;
        userData[prop] = event.target.value;
        setUser(userData)
    }

    const handleSignup = (username, name, bio, org, num, enrl, course, codeforces, codechef, github) => {
        let phoneno = /^\d{10}$/;

        setSubmitState(1)

        if (!username || name === " ") {
            setModalActive(true)
            setModalMsg("Username and First-Name are required fields")

        } else if (course === "") {
            setModalActive(true)
            setModalMsg("Course Name is a required field")

        } else if (!num.match(phoneno)) {
            setModalActive(true)
            setModalMsg("Please enter a valid Contact Number")

        } else {
            signup(username, name, bio, org, num, enrl, course, codeforces, codechef, github)
                .then((res) => {
                    let Error = res.data.error
                    console.log(Error)
                    if (Error.code === 11000) {
                        setModalActive(true)
                        setModalMsg("Username already taken. Please try with different username")

                    } else {
                        setModalActive(true)
                        setModalMsg(Error.details[0].message)
                    }
                })
        }
    }
    const handleModalClose = () => {
        setModalActive(false);
    }


    return (
        <div>
            <Header logo signinPage={true} noProfile={true} />
            <SignupForm onSubmit={handleSignup} onChange={handleChange}
                username={user.username}
                name={user.fname + " " + user.lname}
                bio={user.bio}
                num={user.num}
                org={user.org}
                enrl={user.enrl}
                course={user.course}
                codeforces={user.codeforces}
                codechef={user.codechef}
                github={user.github}
            />
            {modalActive &&
                <Modal>
                    <Btn onClick={handleModalClose} className="btn-popup" html='.' />
                    <div className="alert-signup-popup"> {modalMsg}</div>
                </Modal>
            }
        </div>
    )
}

export default Signup;
