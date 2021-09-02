import React, { Component } from 'react'
import moment from 'moment'
import RegisterAPI from '../../api/register'
import store from '../../store/configureStore'
import Btn from '../buttons/btn'
import Modal from '../popup/index'
import '../../styles/modules/popup.scss'
const config = require('../../config/config.json')

export default class Quiz extends Component {
    constructor(props) {
        super(props);
        this.register = new RegisterAPI({
            id: this.props.quiz._id,
            userId: localStorage.getItem('username')
        })
        this.accessCode = ''
        this.state = {
          modalActive: false,
          registered: false
        }
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.registerUser = this.registerUser.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.openResults = this.openResults.bind(this)
    }

    handleModalOpen() {
        this.setState({modalActive: true})
    }

    handleModalClose() {
        this.setState({modalActive: false})
    }

    registerUser() {
        this.register.registerForQuiz(this.accessCode)
        .then(res => {
            if(res.success){
                this.setState({registered: true})
                window.location.reload();
            }else if(!res.success && res.invalidCode){
                window.alert("You entered wrong code.")
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    handleChange(event) {
        let code = event.target.value;
        this.accessCode = code
    }

    openResults() {
        if(this.state.registered){
            window.location = '/results/' + this.props.quiz._id;
        }
    }

    componentDidMount() {
        this.register.isRegisteredForQuiz()
        .then(res => {
            let data = res.data;
            let registered = data.registered;
            if (registered) {
                this.setState({registered: true})
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
    render() {
        const sNo = this.props.sNo
        let {title, description, startTime, endTime, duration} = this.props.quiz
        if(startTime){
            let date = startTime.toDateString().split(' ')
            let time = startTime.toTimeString().split(' ')[0]
            startTime = date[1] + ' ' + date[0] + ' ' + date[2] + ' ' + time
        }
        if(endTime){
            let date = endTime.toDateString().split(' ')
            let time = endTime.toTimeString().split(' ')[0]
            endTime = date[1] + ' ' + date[0] + ' ' + date[2] + ' ' + time
        }
        if(duration){
            duration = moment.utc(duration*60*1000).format("HH:mm:ss");
        }
        return (
            <div className='table-row'>
                <div className='text quiz-serial-no'>{sNo}</div>
                { !this.state.registered &&
                    <div className='text quiz-name quiz-name-text'>{title}</div>
                }
                { this.state.registered &&
                    <div className='text quiz-name quiz-name-text'><a className='quiz-name-text' href={"/" + this.props.quiz._id}>{title}</a></div>
                }
                <div className='text quiz-description'>{description}</div>
                <div className='text quiz-startTime'>{startTime}</div>
                <div className='text quiz-duration'>{duration}</div>
                { !this.state.registered &&
                    (this.props.past ? 
                    <div className="text not-registered">you aren't registered</div> :
                    <div className="text quiz-register"><Btn className='register-btn' type = 'rounded' html='Register' onClick={this.handleModalOpen} /></div>)
                }
                { this.state.registered &&
                    <div className="text registered">you are registered</div>
                }
                { this.state.modalActive &&
                    <Modal modalDialogue='modalDialogue-enterQuiz'>
                        <Btn onClick={this.handleModalClose} className="btn-popup" html='.' />
                        <div className="quiz-code">
                            <span className="code-text">Enter the code for quiz here</span>
                            <span><input type="text" id="code-input" name="quizCode" placeholder="Eg: A3412 // leave empty incase of no-code" onChange={this.handleChange} /></span>
                            <span><Btn className="enter-quiz" html="Enter quiz" onClick={this.registerUser} /></span>
                        </div>
                    </Modal>
                }
            </div>
        )
    }
} 
