import React, { Component } from 'react'
import Btn from '../buttons/btn'

export default class QuestionBtn extends Component {
    questionClicked = () => {
        this.props.change('q', this.props.question.sno, this.props.question.number)
    }

    render() {
        const question = this.props.question
        let questionClassName = "question-btn "
        if (question.active) questionClassName += "question-active "
        if (question.attempted) questionClassName += "attempted "
        if (question.marked) questionClassName += "marked "
        return (
            <div className="question-btn-container">
                <Btn className={questionClassName}
                    type="round"
                    html={"Q" + (question.number + 1)}
                    onClick={this.questionClicked}
                />
            </div>
        )
    }
}
