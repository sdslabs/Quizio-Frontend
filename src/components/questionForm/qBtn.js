import React, { Component } from 'react'
import Btn from '../buttons/btn'

const QuestionBtn = (props) => {

    return (
        <div className="question-btn-container">
            <Btn className={props.active ? "question-btn question-active" : "question-btn"}
                type="round"
                html={props.html}
                onClick={props.onClick}
            />
        </div>
    )

}

export default QuestionBtn