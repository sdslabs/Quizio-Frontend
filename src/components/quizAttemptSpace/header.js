import React, {Component} from 'react'

export default class TimeHeader extends Component {
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
            <div className="attempt-space-header flex align-center">
                <div className="timer align-end">
                    Remaining time: <span className="bold">{hours}:{minutes}:{seconds}</span>
                </div>
            </div>
        )
    }
}
