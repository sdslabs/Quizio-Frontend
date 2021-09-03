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

    let { startTime, endTime, duration } = props.quiz

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

        registerForQuiz(props.quiz._id, userId, accessCode) // verify args once
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
        isRegisteredForQuiz(props.quiz._id, userId)
            .then((res) => {
                setRegistered(res.data.registered)
            })
    }, [])


    return (
        <div className='table-row'>
            <div className='text quiz-serial-no'>{props.sNo}</div>
            {!registered &&
                <div className='text quiz-name quiz-name-text'>{props.quiz.title}</div>
            }
            {registered &&
                <div className='text quiz-name quiz-name-text'><a className='quiz-name-text' href={"/" + props.quiz._id}>{props.quiz.title}</a></div>
            }
            <div className='text quiz-description'>{props.quiz.description}</div>
            <div className='text quiz-startTime'>{props.quiz.startTime}</div>
            <div className='text quiz-duration'>{props.quiz.duration}</div>
            {!registered &&
                (props.past ?
                    <div className="text not-registered">you aren't registered</div> :
                    <div className="text quiz-register"><Btn className='register-btn' type='rounded' html='Register' onClick={handleModalOpen} /></div>)
            }
            {registered &&
                <div className="text registered">you are registered</div>
            }
            {modalActive &&
                <Modal modalDialogue='modalDialogue-enterQuiz'>
                    <Btn onClick={handleModalClose} className="btn-popup" html='.' />
                    <div className="quiz-code">
                        <span className="code-text">Enter the code for quiz here</span>
                        <span><input type="text" id="code-input" name="quizCode" placeholder="Eg: A3412 // leave empty incase of no-code" onChange={handleAccessCode} /></span>
                        <span><Btn className="enter-quiz" html="Enter quiz" onClick={registerUser} /></span>
                    </div>
                </Modal>
            }
        </div>
    )
}


export default Quiz