import React, { Component } from 'react'
import Section from './section'
import SubjectiveQuestion from './subjectiveQuestion'
import ObjectiveQuestion from './objectiveQuestion'
import Btn from '../buttons/btn'
import '../../styles/modules/quizAttemptSpace.scss'
import MarkDown from '../../parser/markdown'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

const QuizAttemptSpace = (props) => {

    const submit = () => {
        props.onSubmit(props.current.sno, props.current.qno, props.current.answer)
    }

    const mark = () => {
        props.onMark(props.current.sno, props.current.qno)
    }

    const goToPrevQuestion = (e) => {
        e.preventDefault();
        if (props.current.qno > 0) {
            props.change('q', props.current.sno, props.current.qno - 1)
        } else if (props.current.sno > 0) {
            props.change('q', props.current.sno - 1, props.quiz[props.current.sno - 1].questions.length - 1)
        }

    }

    const goToNextQuestion = (e) => {
        e.preventDefault();
        if (props.current.qno + 1 < props.quiz[props.current.sno].questions.length) {
            props.change('q', props.current.sno, props.current.qno + 1)
        } else if (props.current.sno + 1 < props.quiz.length) {
            props.change('q', props.current.sno + 1, 0)
        }
    }


    // prop not yet set
    if (!props.current.type) {
        return ''
    }
    const data = props.current
    // TODO: need better cases names
    switch (data.type) {
        case 's':
            return (
                <div className="attempt-space">
                    {/* <Header time={props.time} /> */}
                    <Section data={data} />
                </div>
            )

        case 'q':
            // MCQ
            let body = []
            if (data.options.length > 0) {
                body.push(<ObjectiveQuestion data={data} key="0" onUpdate={props.onUpdate} />)
            } else {
                body.push(<SubjectiveQuestion data={data} key="0" onUpdate={props.onUpdate} />)
            }
            let markBtnHtml
            if (data.marked) {
                markBtnHtml = "Unmark for Review"
            } else {
                markBtnHtml = "Mark for Review"
            }
            return (
                <div className="attempt-space">
                    {/* <Header time={props.time} /> */}
                    <div className="Section_header">{props.quizTitle}</div>
                    {data.userResults ?
                        <div className="checked-question align-center">
                            {data.showCorrectionStatus ? 'checked by : ' + data.evaluator : 'unchecked'}
                        </div> :
                        ''}
                    <div className="flex head-question-modal">
                        <button type="button" className="arena-slider" onClick={e => goToPrevQuestion(e)}>
                            <i className="fa fa-arrow-circle-o-left arrow arrow-items" aria-hidden="true"></i>
                        </button>
                        <div className="question-modal-heading center-text flex">
                            <div className="inline">
                                Q{data.qno + 1}.
                            </div>
                            <MarkDown code={data.title} />
                            {data.userResults ?
                                <span className="inline max-mark">
                                    {data.score || 0}/{data.info.marks || 0}
                                </span> :
                                <span className="inline max-mark">
                                    MM: {data.info.marks || 0}
                                </span>}
                        </div>
                        <button type="button" className="arena-slider" onClick={e => goToNextQuestion(e)}>
                            <i className="fa fa-arrow-circle-o-right arrow arrow-items" aria-hidden="true"></i>
                        </button>
                    </div>
                    <div className="question-modal align-center">
                        <div className="question-modal-body">
                            <div className="qbody">
                                <MarkDown code={data.body} />
                            </div>
                            {body.map((b) => { return b })}
                        </div>
                    </div>

                    <div className="response-buttons-container">
                        <div id="submission-status" className="flex center">
                        </div>
                        <div className="flex center">
                            <Btn className="submit-btn"
                                type="rounded"
                                html="Submit"
                                onClick={submit}
                            />
                            <Btn className="mark-btn"
                                type="rounded"
                                html={markBtnHtml}
                                onClick={mark}
                            />
                        </div>
                    </div>
                </div>
            )

        default:
            return ""
    }

}
export default QuizAttemptSpace