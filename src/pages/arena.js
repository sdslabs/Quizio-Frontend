import React, { Component } from 'react'
import * as qs from 'query-string'
import Header from '../components/header'
import Btn from '../components/buttons/btn'
import QuizzesAPI from '../api/quizzes'
import RegisterAPI from '../api/register'
import ControlPanel from '../components/controlPanel'
import QuizAttemptSpace from '../components/quizAttemptSpace'
import InformationModal from  '../components/informationModal'
import TimeHeader from '../components/quizAttemptSpace/header'
import Modal from '../components/popup'
import Fullscreen from "react-full-screen";

class Arena extends Component {
    constructor(props) {
        super(props)

        let parsed = qs.parse(this.props.location.search)
        this.userId = localStorage.getItem('username')
        if (!this.props.match.params.groupId) {
            this.quiz = new QuizzesAPI({
                id: this.props.match.params.quizId,
                code: parsed['code'] || '',
                checkRegistration: true
            })
        } else {
            this.quiz = new QuizzesAPI({
                id: this.props.match.params.quizId,
                groupId: this.props.match.params.groupId,
                code: parsed['code'] || '',
                checkRegistration: true
            })
        }
        this.register = new RegisterAPI({
            id: this.props.match.params.quizId,
            userId: localStorage.getItem('username')
        })

        this.state = {
            current: {},
            quiz: [],
            started: true,
            ended: false,
            code: false,
            endQuiz: false,
            modalActive: false,
            fullscreenModalActive: false,
            time: 10, // arbitrary initial value
            isFull : false,
        }
        this.handleModalOpen = this.handleModalOpen.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleFullscreenModalClose = this.handleFullscreenModalClose.bind(this)
    }

    handleModalOpen() {
        this.setState({modalActive: true, isFull: false})
    }

    handleModalClose() {
        this.setState({modalActive: false, isFull: true})
    }

    timer = () => {
        this.setState((state) => {
            if (state.time <= 1) {
                this.stopTimer()
                this.endQuiz()
            }
            return {
                time: state.time - 1
            }
        })
    }

    startTimer = () => {
        setInterval(this.timer, 1000)
    }

    stopTimer = () => {
        clearInterval(this.timer)
    }

    prepareSection = (no) => {
        if (!this.isValid({ sno: no })) {
            return {}
        }
        const currentSection = this.quiz.data.sections[no]
        let score = 0
        if(currentSection.questions){
            currentSection.questions.forEach((question) => {
                score = score + (question.marks || 0)
            })
        }
        return {
            type: 's',
            sno: no,
            title: currentSection.title,
            body: currentSection.description,
            info: {
                marks: score,
                noOfQuestions: currentSection.questions.length
            }
        }
    }

    prepareQuestion = (sno, no) => {
        if (!this.isValid({ sno, qno: no })) {
            return {}
        }
        const currentSection = this.quiz.data.sections[sno]
        const currentQuestion = currentSection.questions[no]
        let ansType = "long"
        if (currentQuestion.autocheck) {
            ansType = "short"
        }
        return {
            type: 'q',
            sno: sno,
            qno: no,
            title: currentQuestion.title,
            body: currentQuestion.body,
            options: currentQuestion.options || [],
            answer: currentQuestion.answer,
            submitted: currentQuestion.submitted,
            marked: currentQuestion.marked,
            ansType,
            info: {
                marks: currentQuestion.marks,
                authors: currentQuestion.authors || []
            }
        }
    }


    exitQuiz = () => {
        this.register.exitQuiz()
        .then(res => {
            if (res.success === true && res.exit === true) {
                this.setState({
                    endQuiz: true
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    componentDidMount() {
        document.addEventListener("visibilitychange", function() {
            alert('Your action has been logged. Switching tabs is not allowed');
        });
        document.oncontextmenu = function() {
            alert('Your action has been logged. Right Click is not allowed');
            return false;
        }
        document.addEventListener("keydown", function(event) {
            if(event.keyCode === 17 || event.keyCode === 224 || event.keyCode === 91 || event.keyCode === 93 || event.keyCode === 18 || event.keyCode === 9){
                alert('Your action has been logged. Following keys are not allowed, "Ctrl", "Cmd", "Alt", "Tab"');
                event.preventDefault();
            }
        });

                this.quiz.fetchQuiz().then(() => {
                    this.quiz.fetchUserResponses(this.userId).then((responses) => {
                        if (!this.quiz.data) {
                            return
                        }
                        this.setState({
                            code: true
                        })
                        if (!this.quiz.data.started) {
                            return this.setState({
                                started: false,
                                ended: false
                            })
                        }
                        if (this.quiz.data.started && this.quiz.data.ended) {
                            return this.setState({
                                started: true,
                                ended: true
                            })
                        }
                        this.quiz.data.registrants.forEach(registrant => {
                            if(registrant.registrant === this.userId && registrant.exitQuiz === true) {
                                this.setState({
                                    endQuiz: true
                                })
                            }
                        })
                        // TODO: check if quiz is ongoing
                        this.quiz.resetAnswers()
                        this.quiz.resetSubmissions()
                        // this.quiz.resetMarkedQuestions()
                        this.setState({
                            quiz: this.quiz.data.sections.map((section, sectionNo) => {
                                let active = false
                                if (sectionNo === 0)  active = true
                                return {
                                    number: sectionNo,
                                    title: section.title,
                                    active,
                                    questions: section.questions.map((question, questionNo) => {
                                        let attempted
                                        if (this.quiz.data.sections[sectionNo].questions[questionNo].submitted !== undefined) {
                                            attempted = true
                                        } else {
                                            attempted = false
                                        }
                                        return {
                                            sno: sectionNo,
                                            number: questionNo,
                                            marked: false,
                                            attempted,
                                            active: false
                                        }
                                    })
                                }
                            }),
                            current: this.prepareSection(0),
                            // useful for clearing active class property on current change
                            activeSno: 0,
                            activeQno: null,
                            time: (this.quiz.data.endTime.getTime() - this.quiz.data.time)/1000
                        })
                        this.startTimer()
                    }).catch((err) => {
                        console.log(err)
                    })
                }).catch((err) => {
                    console.log(err)
                })


    }
    keyDownArena(e){
        if(e.keyCode === 17 || e.keyCode === 91 ||  e.keyCode === 224){
            e.preventDefaults();
        }
    }
    changeCurrent = (type, sno, qno) => {
        this.setState((state) => {
            state.isFull = true;
            const newQuizState = state.quiz
            newQuizState[state.activeSno].active = false
            newQuizState[sno].active = true
            if (state.activeQno != null) {
                newQuizState[state.activeSno].questions[state.activeQno].active = false
            }
            if (type === 's') {
                return {
                    quiz: newQuizState,
                    current: this.prepareSection(sno),
                    activeSno: sno,
                    activeQno: null
                }
            } else if (type === 'q') {
                newQuizState[sno].questions[qno].active = true
                return {
                    quiz: newQuizState,
                    current: this.prepareQuestion(sno, qno),
                    activeSno: sno,
                    activeQno: qno
                }
            }
        })

    }

    isValid = ({sno, qno}) => {
        if (!sno) return true
        if (sno > this.quiz.data.sections.length || sno < 0) {
            return false
        }
        if (!qno) return true
        const currentSection = this.quiz.data.sections[sno]
        if (qno > currentSection.questions.length || qno < 0) {
            return false
        }
        return true
    }

    mark = (sno, qno) => {
        if (!this.isValid({sno, qno})) return
        this.setState((state) => {
           let newQuizState = state.quiz
           newQuizState[sno].questions[qno].marked ^= true
           this.quiz.markQuestion({sno, qno})
           return {
               quiz: newQuizState,
               current: this.prepareQuestion(sno, qno)
           }
        })
    }

    registerAttempt = (sno, qno, ans) => {
        this.setState((state) => {
            let newQuizState = state.quiz
            newQuizState[sno].questions[qno].attempted = true
            return {
                quiz: newQuizState,
                current: this.prepareQuestion(sno, qno)
            }
        })
    }

    submit = (sno, qno, ans) => {
        if (!this.isValid({sno, qno})) return
        this.quiz.submitResponse({ sno, qno }, ans, (res) => {
            if(!res.error) {
                document.getElementById("submission-status").innerHTML = "✓ submitted successfully!!"
                setTimeout(function(){
                    document.getElementById("submission-status").innerHTML = ""
                }, 2000)
                return this.registerAttempt(sno, qno, ans)
            }else{
                document.getElementById("submission-status").innerHTML = "✘ submission failed!!"
                setTimeout(function(){
                    document.getElementById("submission-status").innerHTML = ""
                }, 2000)
            }
        }, (error) => {
            console.log(error)
        })
    }

    saveAnswer = (sno, qno, ans) => {
        if (!this.isValid({sno, qno})) return
        this.quiz.updateAnswer({ sno, qno }, ans)
        this.setState((state) => {
            return {
                current: this.prepareQuestion(sno, qno)
            }
        })
    }

    endQuiz = () => {
        this.setState({
            started: true,
            ended: true
        })
    }
    onfullscreenchange = (isFull) =>{
        if(!isFull && !this.state.modalActive){
            // alert("Your action has been logged. Please return to fullscreen mode");
            this.setState({
                fullscreenModalActive : true,
                isFull : false,
            })
        }
    }

    handleFullscreenModalClose = ()=>{
        this.setState({
            isFull : true,
            fullscreenModalActive  : false,
        })
    }
    render() {

        if (!this.state.started || this.state.ended) {
            let state
            if (!this.state.started) {
                state = "past"
            } else {
                state = "future"
            }

            return (
                <div>

                    <Header logo />
                    <InformationModal
                        state={state}
                        description={this.quiz.data.description}
                        instructions={this.quiz.data.instructions}
                        startTime={this.quiz.data.startTime.toString()}
                        endTime={this.quiz.data.endTime.toString()}
                        duration={this.quiz.data.duration + ' minutes'}
                    />
                </div>
            )
        }
        if (!this.state.code) {
            return ''
        }
        if (this.state.endQuiz) {
            // window.location = '/'
            let state = 'over'
            return (
                <div>
                    <Header logo />
                    <InformationModal
                        state={state}
                        description={this.quiz.data.description}
                        instructions={this.quiz.data.instructions}
                        startTime={this.quiz.data.startTime.toString()}
                        endTime={this.quiz.data.endTime.toString()}
                        duration={this.quiz.data.duration + ' minutes'}
                    />
                </div>
            )
        }
        return (
            <div>
                <Fullscreen
                    enabled={this.state.isFull}
                    onChange={isFull => this.onfullscreenchange(isFull) }
                >
                    { (this.state.fullscreenModalActive) &&
                        <Modal modalDialogue='modalDialogue-fullScreen'>
                            <div className = "alert-signup-popup">
                            {"The quiz is supposed to be conducted in fullscreen mode. Close this dialog to enter fullscreen"}
                            </div>
                            <Btn onClick={this.handleFullscreenModalClose} className="submit-btn_fullscreen" html='Ok' />
                        </Modal>
                    }
                    <Header logo arena={true} exitQuizBtn={true} exitQuizFunction={this.handleModalOpen} noProfile = {true}/>
                    <div className="flex wrap">

                        <ControlPanel
                            time = {this.state.time}
                            change={this.changeCurrent}
                            quiz={this.state.quiz}
                            timerIcon={true}
                        />
                        <QuizAttemptSpace
                            time={this.state.time}
                            onMark={this.mark}
                            onSubmit={this.submit}
                            onUpdate={this.saveAnswer}
                            current={this.state.current}
                            change={this.changeCurrent}
                            quiz={this.state.quiz}
                            quizTitle={this.quiz.data.title}

                        />
                    </div>
                    { this.state.modalActive &&
                        <Modal modalDialogue='modalDialogue-exitQuiz'>
                            <div className="quiz-code">
                                <span className="code-text">Are you sure want to quit</span>
                                <span><Btn className="exit-quiz" html="Yes" onClick={this.exitQuiz} /></span>
                                <span><Btn className="exit-quiz" html="No" onClick={this.handleModalClose} /></span>
                            </div>
                        </Modal>
                    }
                </Fullscreen>
            </div>
        )
    }
}

export default Arena;
