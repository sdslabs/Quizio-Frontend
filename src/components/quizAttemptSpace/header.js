import React, { Component } from 'react'

const TimeHeader = (props) => {

    // Redundant code, make a util function to follow the DRY principle
    let hours = parseInt(props.time / 3600).toString()
    let minutes = parseInt(props.time / 60 - hours * 60).toString()
    if (minutes.length === 1) {
        minutes = '0' + minutes
    }
    let seconds = parseInt(props.time % 60).toString()
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

export default TimeHeader
