import React, { Component } from 'react'
import * as qs from 'query-string'
import Header from '../components/header'
import QuizzesAPI from '../api/quizzes'
import ControlPanel from '../components/controlPanel'
import QuizAttemptSpace from '../components/quizAttemptSpace'
import ResponseAPI from '../api/response'
import InformationModal from  '../components/informationModal'

class UserResults extends Component {
    constructor(props) {
        super(props)
        let parsed = qs.parse(this.props.location.search)
        this.userId = parsed['username']
        this.quizId = this.props.match.params.quizId
        this.quiz = new QuizzesAPI({
            id: this.props.match.params.quizId,
            code: parsed['code'] || '',
            checkOwnership: this.props.checkOwnership
        })
        if (!this.userId) {
            this.response = new ResponseAPI({
                id: this.props.match.params.quizId,
            })
        } else {
            this.response = new ResponseAPI({
                id: this.props.match.params.quizId,
                userId: this.userId
            })
        }
        this.state = {
            current: {},
            quiz: [],
        }
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
            showCorrectionStatus: currentQuestion.showCorrectionStatus,
            evaluator: currentQuestion.evaluator,
            score: currentQuestion.markGiven,
            userResults: true,
            ansType,
            info: {
                marks: currentQuestion.marks,
                authors: currentQuestion.authors || []
            }
        }
    }

    componentDidMount() {
        this.quiz.fetchQuiz().then(() => {
            this.quiz.fetchUserResponses(this.userId).then((responses) => {
                this.quiz.resetSubmissions()
                if(!responses.success)this.quiz.resetAnswers();
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
            }).catch((err) => {
                console.log(err)
            })
        }).catch((err) => {
            console.log(err)
        })
    }

    changeCurrent = (type, sno, qno) => {
        this.setState((state) => {
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

    showSubmitStatus = (res, successMsg, failedMsg) => {
        if(res) {
          document.getElementById("submission-status").innerHTML = "✓ " + successMsg
          setTimeout(function(){
              document.getElementById("submission-status").innerHTML = ""
          }, 2000)
        }else{
          document.getElementById("submission-status").innerHTML = "✘ " + failedMsg
          setTimeout(function(){
              document.getElementById("submission-status").innerHTML = ""
          }, 2000)
        }
    }

    submit = (sno, qno, ans) => {
        if (!this.isValid({sno, qno})) return
        let questionId = this.quiz.data.sections[sno].questions[qno]._id
        let update = {
            'update': {
                questionId,
                'score': ans
            }
        }
        if(!this.quiz.data.sections[sno].questions[qno].isMCQ){
            this.response.updateMarks(update).then((response) => {
                this.showSubmitStatus(response.success, "Score Updated Successfully!", "Can't Update Score!") 
                if(response.success){
                    this.quiz.data.sections[sno].questions[qno].showCorrectionStatus = true
                    this.quiz.data.sections[sno].questions[qno].evaluator = localStorage.getItem('username')
                    this.quiz.data.sections[sno].questions[qno].markGiven = ans
                    this.setState((state) => {
                        return {
                            current: this.prepareQuestion(sno, qno)
                        }
                    })
                }
            }).catch((err) => {
                console.log(err)
            })
        } else {
            this.showSubmitStatus(false, "Score Updated Successfully!", "Can't Update Score!")
        }
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

    render() {
        return (
            <div>
                <Header logo/>
                <div className="flex wrap">
                    <ControlPanel
                        change={this.changeCurrent}
                        quiz={this.state.quiz}
                        timerIcon={false}
                    />
                    <QuizAttemptSpace
                        time={this.state.time}
                        onMark={this.mark}
                        onSubmit={this.submit}
                        onUpdate={this.saveAnswer}
                        current={this.state.current}
                        change={this.changeCurrent}
                        quiz={this.state.quiz}
                        quizTitle={this.quiz.data ? this.quiz.data.title : ''}
                    />
                </div>
            </div>
        );
    }
}

export default UserResults;
