import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import moment from 'moment'
import Btn from '../buttons/btn'
import Modal from '../popup/index' //
import RegisterAPI from '../../api/register' //
import { isRegisteredForQuiz, registerForQuiz } from '../../api/register'
import '../../styles/modules/popup.scss' //


const Quiz = (props) => {
    let history = useHistory()
    let sNo = props.sNo
    let past = props.past
    let quiz = props.quiz
    let { title, description, startTime, endTime, duration } = props.quiz

    let userId = localStorage.getItem('username') // TODO: automatic
    
    const [modalActive, setModalActive] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [accessCode, setAccessCode] = useState('')

    if (startTime) {
        let date = startTime.toDateString().split(' ')
        let time = startTime.toTimeString().split(' ')[0]
        startTime = date[1] + ' ' + date[0] + ' ' + date[2] + ' ' + time
    }
    if (endTime) {
        let date = endTime.toDateString().split(' ')
        let time = endTime.toTimeString().split(' ')[0]
        endTime = date[1] + ' ' + date[0] + ' ' + date[2] + ' ' + time
    }
    if (duration) {
        duration = moment.utc(duration * 60 * 1000).format("HH:mm:ss");
    }

    const handleModalOpen = () => {
        setModalActive(true)
    }

    const handleModalClose = () => {
        setModalActive(false)
    }

    const registerUser = () => {

        registerForQuiz(quiz._id, userId, accessCode) // verify args once
            .then(res => {
                if (res.data.success) {
                    setRegistered(true);

                    window.location.reload(); // better UX needed

                } else if (!res.data.success && res.data.invalidCode) {

                    window.alert("You entered wrong code.") // need better alerts
                }
            })
    }

    const handleAccessCode = (event) => {
        setAccessCode(event.target.value)
    }

    const openResults = () => {
        registered && history.push(`results/${props.quiz._id}`)
    }

    useEffect(() => {
        let res = await isRegisteredForQuiz(quiz._id, userId)
        setRegistered(res.data.registered)
    }, [])

    
    return (
        <div className='table-row'>
            <div className='text quiz-serial-no'>{sNo}</div>
            {!this.state.registered &&
                <div className='text quiz-name quiz-name-text'>{title}</div>
            }
            {this.state.registered &&
                <div className='text quiz-name quiz-name-text'><a className='quiz-name-text' href={"/" + this.props.quiz._id}>{title}</a></div>
            }
            <div className='text quiz-description'>{description}</div>
            <div className='text quiz-startTime'>{startTime}</div>
            <div className='text quiz-duration'>{duration}</div>
            {!this.state.registered &&
                (this.props.past ?
                    <div className="text not-registered">you aren't registered</div> :
                    <div className="text quiz-register"><Btn className='register-btn' type='rounded' html='Register' onClick={this.handleModalOpen} /></div>)
            }
            {this.state.registered &&
                <div className="text registered">you are registered</div>
            }
            {this.state.modalActive &&
                <Modal modalDialogue='modalDialogue-enterQuiz'>
                    <Btn onClick={this.handleModalClose} className="btn-popup" html='.' />
                    <div className="quiz-code">
                        <span className="code-text">Enter the code for quiz here</span>
                        <span><input type="text" id="code-input" name="quizCode" placeholder="Eg: A3412 // leave empty incase of no-code" onChange={this.handleAccessCode} /></span>
                        <span><Btn className="enter-quiz" html="Enter quiz" onClick={this.registerUser} /></span>
                    </div>
                </Modal>
            }
        </div>
    )
}


export default Quiz