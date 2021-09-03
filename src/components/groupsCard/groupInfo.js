import React, { Component, useEffect, useState } from 'react'
import Btn from '../buttons/btn'
import GroupIcon from './groupIcon';
import Modal from '../popup/index'
import { joinGroup, leaveGroup } from '../../api/groups'

const GroupInfo = (props) => {


    let state = props.state
    const [accessCode, setAccessCode] = useState("")
    const [joinGroupId, setJoinGroupId] = useState("")
    const [leaveGroupId, setLeaveGroupId] = useState("")
    const [joined, setJoined] = useState(false)
    const [left, setLeft] = useState(false)
    const [undo, setUndo] = useState(false)
    const [modalActive, setModalActive] = useState(0)
    const [errorModalActive, setErrorModalActive] = useState(false)
    const [errorModalMsg, setErrorModalMsg] = useState("")

    useEffect(() => {
        setJoined(false)
    }, [joined])

    useEffect(() => {
        setLeft(false)
    }, [left])

    // [TODO] verify if this is correct conversion ^^

    // componentDidUpdate(prevProps){
    //     if(this.props.state != prevProps.state){
    //         this.setState({
    //             left : false,
    //             joined : false,
    //         })
    //     }
    // }


    const handleJoinGroup = (groupId, accessCode) => {
        joinGroup(groupId, accessCode)
            .then((res) => {

                if (res.data.join) {
                    setModalActive(0)
                    undo ? setLeft(!undo) : setJoined(!undo)
                    setUndo(0)

                } else {
                    setModalActive(0)
                    setErrorModalActive(true)
                    setErrorModalMsg("Unable to join the group. Wrong Access Code. Please Try Again")
                }
            }).catch((err) => {
                console.log("Error joining group: ", err)
            })
    }

    const handleLeaveGroup = (groupId) => {
        leaveGroup(groupId)
            .then((res) => {
                if (res.data.leave) {
                    setModalActive(0)
                    undo ? setJoined(!undo) : setLeft(!undo)
                    setUndo(0)

                } else {
                    setModalActive(0)
                    setErrorModalActive(true)
                    setErrorModalMsg("Unable to leave the group.Please Try Again")
                }
            }).catch((err) => {
                console.log("Error while leaving group: ", err)
            })
    }

    const handleOpenModal = (event) => {
        let groupId = event.target.parentElement.className;
        let undo = groupId.split(" ")[0] === "group-undo-container" ? 1 : 0
        groupId = groupId.substr(groupId.indexOf(' ') + 1);

        console.log("handleOpenModal")

        // this.props.state will always be true since we initialized it already?
        // DOUBT
        // if(this.props.state ^ undo){
        //     this.setState({
        //         modalActive : 2,
        //         leaveGroupId : groupId,
        //         undo : undo
        //     })
        // }else{
        //     this.setState({
        //         modalActive : 1,
        //         joinGroupId : groupId,
        //         undo : undo
        //     })

        // }
    }

    const handleSubmitModal = (event) => {
        let modalType = (event.target.innerHTML).split(" ")
        modalType = modalType[0] == "Join" ? 1 : 0

        modalType ? handleJoinGroup(joinGroupId, accessCode) : handleLeaveGroup(leaveGroupId)
    }


    const handleModalClose = () => {
        setModalActive(0)
        setErrorModalActive(false)
    }

    const handleUpdateAccessCode = (event) => {
        setAccessCode(event.target.value)
    }


    return (
        <div className={"group-info flex " + props.className ? props.className : ""}>
            <GroupIcon className='group-icon-info' width='100' height='100' />
            <div className="group-info-content">
                <div className="group-info-heading">{props.name}</div>
                <div className="group-info-sub-heading">{props.description}</div>
            </div>
            {(!joined && !left) &&
                <div className={"join-btn " + props.name}>
                    <Btn type="round" html={state === 0 ? "+" : " - "} className={"group-add-btn "} onClick={handleOpenModal}></Btn>
                </div>
            }
            {(joined || left) &&
                <div className={'group-undo-container ' + props.name} id="group-undo">
                    <div className="group-temporary-status">{joined ? "Added" : "Removed"}</div>
                    <button className="group-undo-btn" onClick={handleOpenModal}>Undo</button>
                </div>
            }
            {(modalActive > 0) &&
                <Modal modalDialogue='modalDialogue-enterQuiz'>
                    <Btn onClick={handleModalClose} className="btn-popup" html='.' />
                    <div className="quiz-code">
                        {(modalActive == 1) && <span className="code-text">Enter the code to join the group</span>}
                        {(modalActive == 1) && <span><input type="text" id="code-input" name="quizCode" placeholder="Eg: A3412 // leave empty incase of no-code" onChange={handleUpdateAccessCode} /></span>}
                        <span><Btn className="enter-quiz" html={(modalActive > 1) ? "Leave Group" : "Join Group"} onClick={handleSubmitModal} /></span>
                    </div>
                </Modal>
            }
            {errorModalActive &&
                <Modal modalDialogue='modalDialogue-enterQuiz'>
                    <Btn onClick={handleModalClose} className="btn-popup" html='.' />
                    <div className="alert-signup-popup"> {errorModalMsg}</div>
                </Modal>
            }
        </div>

    )
}

export default GroupInfo