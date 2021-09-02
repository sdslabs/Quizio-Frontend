import React, { Component } from 'react'
import Btn from '../buttons/btn'
import QuestionBtn from './questionBtn'

export default class SectionCard extends Component {
    sectionClicked = () => {
        this.props.change('s', this.props.section.number)
    }

    render() {
        const section = this.props.section
        let sectionClassName = "section-title "
        let type = "rounded"
        if (section.active) {
            sectionClassName += "section-active highlight-thin"
            type = ""
        }
        return (
            <div className="section-card ">
                <div className="section-title-container">
                    <Btn className={sectionClassName}
                        html={section.title}
                        onClick={this.sectionClicked}
                        type={type}
                    />
                </div>
                <div className="questions-card flex wrap">
                    {
                        section.questions.map((question, questionNo) => {
                            return (
                                <QuestionBtn question={question}
                                    key={questionNo}
                                    change={this.props.change}
                                />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}