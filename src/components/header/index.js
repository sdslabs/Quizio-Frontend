import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Row, Col, Container } from 'react-bootstrap';
import { logout } from '../../api/auth';
import '../../assets/styles/header.scss'
import exitIcon from '../../assets/images/exit.svg'

const Header = (props) => {

    let history = useHistory()
    const imageUrl = props.imageUrl || 'https://upload.wikimedia.org/wikipedia/en/5/5f/TomandJerryTitleCardc.jpg'

    const redirectToHome = () => {
        history.push("/")
    }

    const redirectToProfile = () => {
        history.push("/users/profile")
    }

    return (
        <Container fluid>
            <Row className="header">
                <Col xs={1} className="logo text-center" onClick={redirectToHome}>Quizio</Col>
                <Col xs={7} className="search-bar text-center">
                    {props.loggedIn && <>...Search Bar here...</>}
                </Col>
                <Col xs={2} className="name text-center">
                    {props.loggedIn && <>Welcome {props.userName} !</>}
                </Col>
                <Col xs={1} className="d-flex align-items-center justify-content-center">
                    <img src={imageUrl} className="profile" onClick={redirectToProfile}></img>
                </Col>
                <Col xs={1}>
                    {(props.loggedIn && !props.givingQuiz) && <button className="logout" onClick={props.handleLogOut}>Logout</button>}
                    {(props.loggedIn && props.givingQuiz) && <button className="exit" onClick={props.handleSubmitQuiz}>Submit Quiz<img src={exitIcon} /> </button>}
                </Col>
            </Row>
        </Container>
    )
}

export default Header