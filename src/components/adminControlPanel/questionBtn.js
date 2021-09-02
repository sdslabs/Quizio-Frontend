import React, { Component } from 'react'
import Btn from '../buttons/btn'

export default class QuestionBtn extends Component {
    questionClicked = () => {
        this.props.change('q', this.props.question.sno, this.props.question.qno)
    }

    questionCreate = () => {
        this.props.create('q', this.props.sid, this.props.sno)
    }

    render() {
        // console.log(this.props, 'quest')

        if(this.props.action === 'create'){
            // TODO: make the boundary dotted and font size bigger for create type css
            return(
                <div className="question-btn-container">
                    <Btn className="question-btn create"
                        type="round"
                        html={'+'}
                        onClick={this.questionCreate}
                    />
                </div>
            )
        }
        else{
            let questionClassName = "question-btn "
            // console.log(this.props.question, this.pr)
            if (this.props.question.active) questionClassName += "question-active "
            let text = "Q" + (this.props.question.qno + 1)
            return (
                <div className="question-btn-container">
                    <Btn className={questionClassName}
                        type="round"
                        html={text}
                        onClick={this.questionClicked}
                    />
                </div>
            )
        }
    }
}
