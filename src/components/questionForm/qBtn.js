import React, { Component } from 'react'
import Btn from '../buttons/btn'

export default class QuestionBtn extends Component {


    render() {
        let questionClassName = "question-btn "
        if (this.props.active === true) questionClassName += "question-active "
        
        return (
            <div className="question-btn-container">
                <Btn className={questionClassName}
                    type="round"
                    html={this.props.html}
                    onClick={this.props.onClick}
                />
            </div>
        )
    }
}
