import React, { Component } from 'react'
import MarkDown from '../../parser/markdown'

export default class InformationModal extends Component {
    render() {
        let announcement
        if (this.props.state === 'past') {
            announcement = "This quiz is yet to start"
        } else if (this.props.state === 'future') {
            announcement = "This quiz is over"
        } else if (this.props.state === 'over') {
            announcement = "This quiz is over for you! Try to contact the ADMINS if you exited the quiz by mistake!"
        }
        return (
            <div className="information-modal">
                <div className="information-modal-heading center-text">
                    {announcement}
                </div>
                <div className="information-modal-body">
                    <div className="quiz-timing-information align-center">
                        <MarkDown code={this.props.description}/>
                    </div>
                    <div className="quiz-timing-information align-center">
                        <div className="bold">Instructions </div>
                        <MarkDown code={this.props.instructions}/>
                    </div>
                    <div className="quiz-timing-information align-center">
                        <span className="bold">Start time: </span>{this.props.startTime}<br />
                        <span className="bold">End time: </span>{this.props.endTime}<br />
                        <span className="bold">Duration: </span>{this.props.duration}
                    </div>
                </div>
            </div>

        )
    }
}
