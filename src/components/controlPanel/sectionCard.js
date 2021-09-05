import React, { Component } from 'react'
import Btn from '../buttons/btn'
import QuestionBtn from './questionBtn'

const SectionCard = (props) => {

    const section = props.section

    const sectionClicked = () => {
        props.change('s', props.section.number)
    }


    return (
        <div className="section-card ">
            <div className="section-title-container">
                <Btn className={section.active ? "section-title section-active highlight-thin" : "section-title"}
                    html={section.title}
                    onClick={sectionClicked}
                    type={section.active ? "" : "rounded"}
                />
            </div>
            <div className="questions-card flex wrap">
                {section.questions.map((question, questionNo) => {
                    return (
                        <QuestionBtn question={question}
                            key={questionNo}
                            change={props.change}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default SectionCard