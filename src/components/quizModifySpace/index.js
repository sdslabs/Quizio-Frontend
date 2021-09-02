import React, { Component } from 'react'
import Section from './section'
import Btn from '../buttons/btn'
import '../../styles/modules/quizAttemptSpace.scss'
import Question from './question'
import QuizEditor from './quiz'
import RegistrantsTable from './../registrants/registrantsTable' 

export default class QuizAttemptSpace extends Component {

    render() {
        if (!this.props.current.type) {
            return ''
        }
        switch(this.props.current.type) {
            case 's':
                return (
                    <div className="attempt-space">
                        <Section data={this.props.current} onUpdate={this.props.onUpdate} />
                        <div className="response-buttons-container">
                            <div id="submission-status" className="flex center">
                            </div>
                            <div className="flex center">
                                {this.props.current.actionOnSubmit=="create" ?
                                    <Btn className="submit-btn-create"
                                        type="rounded"
                                        html={this.props.current.actionOnSubmit}
                                        onClick={this.props.submit}
                                    /> :
                                    <Btn className="submit-btn"
                                        type="rounded"
                                        html={this.props.current.actionOnSubmit}
                                        onClick={this.props.submit}
                                    />
                                }
                                <Btn className="mark-btn"
                                    type="rounded"
                                    html="Delete"
                                    onClick={this.props.delete}
                                />
                            </div>
                        </div>
                    </div> 
                )
            case 'q':
                return (
                    <Question data={this.props.current} quiz={this.props.quiz} change={this.props.change} onUpdate={this.props.onUpdate} submit={this.props.submit} delete={this.props.delete}/>
                )
            case 'quiz':
                return (
                    <div className="attempt-space">
                        <QuizEditor data={this.props.current} onUpdate={this.props.onUpdate} />
                        <div className="response-buttons-container">
                            <div id="submission-status" className="flex center">
                            </div>
                            <div className="flex center">
                                <Btn className="submit-btn"
                                    type="rounded"
                                    html={this.props.current.actionOnSubmit}
                                    onClick={this.props.submit}
                                />
                            </div>
                        </div>
                    </div>
                )
            case 'registrants':
                return (
                    <RegistrantsTable quizId={this.props.quizId} registrants={this.props.current.registrants}/>
                )
            case 'autoCheck':
                return (
                    this.props.current.autochecked ? 
                    <div id="submission-autocheck" className="attempt-space">auto checked the MCQ type questions</div> :
                    <div id="submission-autocheck-failed">auto check failed. Might wanna refresh!</div>
                )
            default:
                return "Some error has occured in selection of question. Might wanna refresh!"
        }
    }
}