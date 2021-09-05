import React from 'react'
import SectionCard from './sectionCard'
import '../../styles/modules/controlPanel.scss'

const ControlPanel = (props) => {

    let hours = parseInt(props.time / 3600).toString()
    let minutes = parseInt(props.time / 60 - hours * 60).toString()
    minutes = minutes.length === 1 ? '0' + minutes : minutes
    let seconds = parseInt(props.time % 60).toString()
    seconds = seconds.length === 1 ? '0' + seconds : seconds


    return (

        <div className="cp">
            {props.timerIcon && (
                <div className="time_remains">
                    <div className="time_flex_cont">
                        <div className="clock_vector"></div>
                        <div className="time_shower_rem">{hours}:{minutes}:{seconds}</div>
                    </div>
                </div>
            )}
            <div className="cp-info">
                <div className="cp-info-heading">
                    Select the section that you wish to attempt.
                </div>
                <div className="cp-info-content">
                    <span className="attempted-color">Blue</span> represents attempted questions.<br></br>
                    <span className="marked-color">Orange</span> represents marked questions.
                </div>
            </div>
            {props.quiz.map((section, sectionNo) => {
                return (
                    <SectionCard section={section} key={sectionNo} change={props.change} />
                )
            })
            }
        </div>
    )

}
export default ControlPanel