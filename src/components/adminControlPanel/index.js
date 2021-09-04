import React from 'react'
import SectionCard from './sectionCard'
import Btn from '../buttons/btn'
import '../../styles/modules/controlPanel.scss'
import { useHistory } from 'react-router'


const ControlPanel = (props) => {

    let history = useHistory()

    const editQuiz = () => {
        props.change('quiz', null, null)
    }

    const showRegistrants = () => {
        props.change('registrants', null, null)
    }

    const autoCheck = () => {
        props.change('autoCheck', null, null)
        props.autoCheck()
    }

    const openResults = () => {
        history.push(`/results/${props.quizId}`)
    }

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
                        onClick={editQuiz}
                    />
                </div>
            </div>
            <div className="section-card ">
                <div className="section-title-container">
                    <Btn className={"section-title"}
                        html={"Show Registrants"}
                        onClick={showRegistrants}
                    />
                </div>
            </div>
            {
                props.quiz.map((section, sectionNo) => {
                    return (
                        <SectionCard action='edit' section={section} key={'edit' + section.sid} change={props.change} create={props.create} />
                    )
                })
            }
            <SectionCard action='create' create={props.create} />
            <div className="section-card ">
                <div className="section-title-container">
                    <Btn className={"section-title"}
                        html={"Auto Check"}
                        onClick={autoCheck}
                        type={"rounded"}
                    />
                </div>
            </div>
            <div className="section-card ">
                <div className="section-title-container">
                    <Btn className='section-title'
                        type='rounded'
                        html='Results'
                        onClick={openResults}
                    />
                </div>
            </div>
        </div>
    )
}

export default ControlPanel