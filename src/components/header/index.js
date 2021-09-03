import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import '../../styles/modules/header.scss'

const Header = (props) => {

    let history = useHistory()
    const arena = props.arena // what is arena?
    const loggedIn = props.loggedIn
    const givingQuiz = props.givingQuiz
    const imageUrl = props.imageUrl || 'https://upload.wikimedia.org/wikipedia/en/5/5f/TomandJerryTitleCardc.jpg'
    const [name, setName] = useState("");

    useEffect(() => {
        let name = localStorage.getItem('username')
        setName(name)
    }, [])


    const redirectToHome = () => {
        !arena && history.push("/")
    }

    const redirectToProfile = () => {
        history.push("/users/profile")
    }

    return (
        <Container fluid>
            <Row className="header">
                <Col xs={1} className="logo text-center" onClick={redirectToHome}>Quizio</Col>
                <Col xs={7} className="search-bar text-center">
                    {loggedIn && <>...Search Bar here...</>}
                </Col>
                <Col xs={2} className="name text-center">
                    {loggedIn && <>Welcome {name} !</>}
                </Col>
                <Col xs={1} className="d-flex align-items-center justify-content-center">
                    <img src={imageUrl} className="profile" onClick={redirectToProfile}></img>
                </Col>
                <Col xs={1}>
                    {loggedIn && <button className="logbutton" onClick={props.handleLogOut}>Logout</button>}
                    {givingQuiz && <button className="exitQuizButton" onClick={props.handleSubmitQuiz}>Submit Quiz</button>}
                </Col>

            </Row>
        </Container>
    )
}

export default Header