import React, { Component } from 'react'
import SectionCard from './sectionCard'
import '../../styles/modules/controlPanel.scss'

export default class ControlPanel extends Component {
    render() {
        let hours = parseInt(this.props.time/3600).toString()
        let minutes = parseInt(this.props.time/60 - hours*60).toString()
        if (minutes.length === 1) {
            minutes = '0' + minutes
        }
        let seconds = parseInt(this.props.time%60).toString()
        if (seconds.length === 1) {
            seconds = '0' + seconds
        }
        return (

            <div className="cp">
              {this.props.timerIcon &&
                <div className = "time_remains">
                    <div className = "time_flex_cont">
                        <div className = "clock_vector"></div>
                         <div className = "time_shower_rem">{hours}:{minutes}:{seconds}</div>
                    </div>
                </div>
              }                
                <div className="cp-info">
                    <div className="cp-info-heading">
                        Select the section that you wish to attempt.
                    </div>
                    <div className="cp-info-content">
                        <span className="attempted-color">Blue</span> represents attempted questions.<br></br>
                        <span className="marked-color">Orange</span> represents marked questions.
                    </div>
                </div>
                {
                    this.props.quiz.map((section, sectionNo) => {
                        return (
                            <SectionCard section={section} key={sectionNo} change={this.props.change} />
                        )
                    })
                }
            </div>
        )
    }
}
