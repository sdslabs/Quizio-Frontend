import React from 'react'
import Btn from '../buttons/btn'

const QuestionBtn = (props) => {
    const questionClicked = () => {
        props.change('q', props.question.sno, props.question.qno)
    }

    const questionCreate = () => {
        props.create('q', props.sid, props.sno)
    }

    // TODO: make the boundary dotted and font size bigger for create type css
    return (props.action === 'create' ? (
        <div className="question-btn-container">
            <Btn className="question-btn create"
                type="round"
                html={'+'}
                onClick={questionCreate}
            />
        </div>
    ) : (
        <div className="question-btn-container">
            <Btn className={props.question.active ? "question-btn question-active" : "question-btn"}
                type="round"
                html={"Q" + (props.question.qno + 1)}
                onClick={questionClicked}
            />
        </div>
    ))
}

export default QuestionBtn