import React from 'react'
import MarkDown from '../../parser/markdown'

const InformationModal = (props) => {
    let announcement
    switch (props.state) {
        case "past":
            announcement = "This quiz is yet to start"
            break;
        case "future":
            announcement = "This quiz is over"
            break;

        case "over":
            announcement = "This quiz is over for you! Try to contact the ADMINS if you exited the quiz by mistake!"
            break;

        default:
            break;
    }

    return (
        <div className="information-modal">
            <div className="information-modal-heading center-text">
                {announcement}
            </div>
            <div className="information-modal-body">
                <div className="quiz-timing-information align-center">
                    <MarkDown code={props.description} />
                </div>
                <div className="quiz-timing-information align-center">
                    <div className="bold">Instructions </div>
                    <MarkDown code={props.instructions} />
                </div>
                <div className="quiz-timing-information align-center">
                    <span className="bold">Start time: </span>{props.startTime}<br />
                    <span className="bold">End time: </span>{props.endTime}<br />
                    <span className="bold">Duration: </span>{props.duration}
                </div>
            </div>
        </div>

    )
}
export default InformationModal