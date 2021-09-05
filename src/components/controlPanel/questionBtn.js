import React, { Component } from 'react'
import Btn from '../buttons/btn'

const QuestionBtn = (props) => {
    const question = props.question


    const questionClicked = () => {
        props.change('q', props.question.sno, props.question.number)
    }

    let questionClassName = "question-btn "
    if (question.active) questionClassName += "question-active "
    if (question.attempted) questionClassName += "attempted "
    if (question.marked) questionClassName += "marked "
    
    return (
        <div className="question-btn-container">
            <Btn className={questionClassName}
                type="round"
                html={"Q" + (question.number + 1)}
                onClick={questionClicked}
            />
        </div>
    )
}
export default QuestionBtn