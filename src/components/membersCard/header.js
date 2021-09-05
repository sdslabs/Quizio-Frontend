import React, { Component, useState } from 'react'
import Btn from '../buttons/btn'
import Modal from '../popup/index'
import { updateGroup } from '../../api/groups'

const Header = (props) => {

    const [modalActive, setModalActive] = useState(false);
    const [modalError, setModalError] = useState("");
    const [joinMemberId, setJoinMemberId] = useState("")

    const activateModal = () => {
        setModalActive(true)
    }

    const addMembers = () => {

        updateGroup(props.groupId, { addMembers: joinMemberId })
            .then(res => {
                res = res.data
                if (res.success && res.status) {
                    setModalActive(false)
                    // TODO find better option than reload
                    window.location.reload()
                } else {
                    setModalError("Unable to add the member")
                }
            })
            .catch(error => {
                // TODO standard error handlers needed
                console.log(error)
            })
    }

    const handleChange = (event) => {
        setJoinMemberId(event.target.value)
    }

    const handleModalClose = () => {
        setModalActive(false)
    }

    // ??
    let className = ["", ""]
    if (props.state === 0) {
        className = ["highlight", ""]
    } else {
        className = ["", "highlight"]
    }
    return (
        <div className="group-card-header-container">
            <div className="group-card-header flex wrap">
                <div className="members-card-header-title"> {"Group Members " + "("
                    + props.numMembers + ")"}
                </div>
            </div>
            <div className="create-group-btn-container">
                <div className="create-group-label">Add Members</div>
                <div className="group-card-btn">
                    <Btn type="round"
                        className="create-group-btn"
                        html="+"
                        onClick={activateModal} />
                </div>
            </div>
            {modalActive &&
                <Modal modalDialogue='modalDialogue-enterQuiz'>
                    <Btn onClick={handleModalClose} className="btn-popup" html='.' />
                    <div className="quiz-code">
                        <span className="code-text">Enter the username of the member</span>
                        <span><input type="text" id="code-input" name="quizCode" placeholder="Enter username of the member eg: user@gmail.com" onChange={handleChange} /></span>
                        <span><Btn className="enter-quiz" html="Add Member" onClick={addMembers} /></span>
                    </div>
                </Modal>
            }
        </div>
    )

}

export default Header