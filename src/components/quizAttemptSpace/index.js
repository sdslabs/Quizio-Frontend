import React, { Component } from 'react'
import Section from './section'
import SubjectiveQuestion from './subjectiveQuestion'
import ObjectiveQuestion from './objectiveQuestion'
import Btn from '../buttons/btn'
import '../../styles/modules/quizAttemptSpace.scss'
import MarkDown from '../../parser/markdown'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

export default class QuizAttemptSpace extends Component {
    constructor(props) {
        super(props)
        this.goToPrevQuestion = this.goToPrevQuestion.bind(this)
        this.goToNextQuestion = this.goToNextQuestion.bind(this)
    }

    submit = () => {
        this.props.onSubmit(this.props.current.sno, this.props.current.qno, this.props.current.answer)
    }

    mark = () => {
        this.props.onMark(this.props.current.sno, this.props.current.qno)
    }

    goToPrevQuestion(e) {
        e.preventDefault();
        if(this.props.current.qno > 0) {
            this.props.change('q', this.props.current.sno, this.props.current.qno-1)
        }else if(this.props.current.sno > 0) {
            this.props.change('q', this.props.current.sno-1, this.props.quiz[this.props.current.sno-1].questions.length-1)
        }
        
    }

    goToNextQuestion(e) {
        e.preventDefault();
        if(this.props.current.qno+1 < this.props.quiz[this.props.current.sno].questions.length) {
            this.props.change('q', this.props.current.sno, this.props.current.qno+1)
        }else if(this.props.current.sno+1 < this.props.quiz.length) {
            this.props.change('q', this.props.current.sno+1, 0)
        }
    }

    render() {
        // prop not yet set
        if (!this.props.current.type) {
            return ''
        }
        const data = this.props.current
        switch(data.type) {
            case 's':
                return (
                    <div className="attempt-space">
                        {/* <Header time={this.props.time} /> */}
                        <Section data={data} />
                    </div>  
                )
            
            case 'q':
                // MCQ
                let body = []
                if (data.options.length > 0) {
                    body.push(<ObjectiveQuestion data={data} key="0" onUpdate={this.props.onUpdate} />)
                } else {
                    body.push(<SubjectiveQuestion data={data} key="0" onUpdate={this.props.onUpdate} />)
                }
                let markBtnHtml
                if (data.marked) {
                    markBtnHtml = "Unmark for Review"
                } else {
                    markBtnHtml = "Mark for Review"
                }
                return (
                    <div className="attempt-space">
                        {/* <Header time={this.props.time} /> */}
                        <div className = "Section_header">{this.props.quizTitle}</div>
                        {data.userResults ? 
                            <div className="checked-question align-center">
                                {data.showCorrectionStatus ? 'checked by : ' + data.evaluator : 'unchecked'}
                            </div> :
                        ''}
                        <div className="flex head-question-modal">
                            <button type="button" className="arena-slider" onClick={e => this.goToPrevQuestion(e)}>
                                <i className="fa fa-arrow-circle-o-left arrow arrow-items" aria-hidden="true"></i>
                            </button>
                            <div className="question-modal-heading center-text flex">
                                <div className="inline">
                                    Q{data.qno + 1}. 
                                </div>
                                <MarkDown code={data.title}/>
                                {data.userResults ? 
                                <span className="inline max-mark">
                                    {data.score || 0}/{data.info.marks || 0}
                                </span>: 
                                <span className="inline max-mark">
                                    MM: {data.info.marks || 0}
                                </span>}
                            </div>
                            <button type="button" className="arena-slider" onClick={e => this.goToNextQuestion(e)}>
                                <i className="fa fa-arrow-circle-o-right arrow arrow-items" aria-hidden="true"></i>
                            </button>
                        </div>
                        <div className="question-modal align-center">
                            <div className="question-modal-body">
                                <div className="qbody">
                                    <MarkDown code={data.body}/>
                                </div>
                                {body.map((b) => {return b})}
                            </div>
                        </div>
                        
                        <div className="response-buttons-container">
                            <div id="submission-status" className="flex center">
                            </div>
                            <div className="flex center">
                                <Btn className="submit-btn"
                                    type="rounded"
                                    html="Submit"
                                    onClick={this.submit}
                                />
                                <Btn className="mark-btn"
                                    type="rounded"
                                    html={markBtnHtml}
                                    onClick={this.mark}
                                />
                            </div>
                        </div>
                    </div>
                )

            default:
                return ""
        }
    }
}