import React, { Component } from 'react'
import SectionCard from './sectionCard'
import Btn from '../buttons/btn'
import '../../styles/modules/controlPanel.scss'


export default class ControlPanel extends Component {
    editQuiz = () => {
        this.props.change('quiz', null, null)
    }

    showRegistrants = () => {
        this.props.change('registrants', null, null)
    }

    autoCheck = () => {
        this.props.change('autoCheck', null, null)
        this.props.autoCheck()
    }

    openResults = () => {
        window.location = '/results/' + this.props.quizId;
    }

    render() {
        return (
            <div className="cp">
                <div className="cp-info">
                    <div className="cp-info-heading">
                        Select the section that you wish to change.
                    </div>
                </div>
                <div className="section-card ">
                    <div className="section-title-container">
                        <Btn className={"section-title"}
                            html={"Edit Quiz Details"}
                            onClick={this.editQuiz} 
                        />
                    </div>
                </div>
                <div className="section-card ">
                    <div className="section-title-container">
                        <Btn className={"section-title"}
                            html={"Show Registrants"}
                            onClick={this.showRegistrants} 
                        />
                    </div>
                </div>
                {
                    this.props.quiz.map((section, sectionNo) => {
                        return (
                            <SectionCard action='edit' section={section} key={'edit' + section.sid} change={this.props.change} create={this.props.create} />
                        )
                    })
                }
                <SectionCard action='create' create={this.props.create} />
                <div className="section-card ">
                    <div className="section-title-container">
                        <Btn className={"section-title"}
                            html={"Auto Check"}
                            onClick={this.autoCheck}
                            type={"rounded"}
                        />
                    </div>
                </div>
                <div className="section-card ">
                    <div className="section-title-container">
                        <Btn className='section-title'
                            type = 'rounded'
                            html='Results'
                            onClick={this.openResults}
                        />
                    </div>
                </div>
            </div>
        )
    }
}