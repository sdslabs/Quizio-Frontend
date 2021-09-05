import React, { Component } from 'react'
import Section from './section'
import Btn from '../buttons/btn'
import '../../styles/modules/quizAttemptSpace.scss'
import Question from './question'
import QuizEditor from './quiz'
import RegistrantsTable from './../registrants/registrantsTable'

const QuizAttemptSpace = (props) => {

    // TODO better switch cases
    if (!props.current.type) {
        return ''
    }
    switch (props.current.type) {
        case 's':
            return (
                <div className="attempt-space">
                    <Section data={props.current} onUpdate={props.onUpdate} />
                    <div className="response-buttons-container">
                        <div id="submission-status" className="flex center">
                        </div>
                        <div className="flex center">
                            {props.current.actionOnSubmit == "create" ?
                                <Btn className="submit-btn-create"
                                    type="rounded"
                                    html={props.current.actionOnSubmit}
                                    onClick={props.submit}
                                /> :
                                <Btn className="submit-btn"
                                    type="rounded"
                                    html={props.current.actionOnSubmit}
                                    onClick={props.submit}
                                />
                            }
                            <Btn className="mark-btn"
                                type="rounded"
                                html="Delete"
                                onClick={props.delete}
                            />
                        </div>
                    </div>
                </div>
            )
        case 'q':
            return (
                <Question data={props.current} quiz={props.quiz} change={props.change} onUpdate={props.onUpdate} submit={props.submit} delete={props.delete} />
            )
        case 'quiz':
            return (
                <div className="attempt-space">
                    <QuizEditor data={props.current} onUpdate={props.onUpdate} />
                    <div className="response-buttons-container">
                        <div id="submission-status" className="flex center">
                        </div>
                        <div className="flex center">
                            <Btn className="submit-btn"
                                type="rounded"
                                html={props.current.actionOnSubmit}
                                onClick={props.submit}
                            />
                        </div>
                    </div>
                </div>
            )
        case 'registrants':
            return (
                <RegistrantsTable quizId={props.quizId} registrants={props.current.registrants} />
            )
        case 'autoCheck':
            return (
                props.current.autochecked ?
                    <div id="submission-autocheck" className="attempt-space">auto checked the MCQ type questions</div> :
                    <div id="submission-autocheck-failed">auto check failed. Might wanna refresh!</div>
            )
        default:
            return "Some error has occured in selection of question. Might wanna refresh!"
    }

}

export default QuizAttemptSpace