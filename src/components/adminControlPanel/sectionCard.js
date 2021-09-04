import React, { Component } from 'react'
import Btn from '../buttons/btn'
import QuestionBtn from './questionBtn'

const SectionCard = (props) => {

    const sectionClicked = () => {
        props.change('s', props.section.sno)
    }

    const createSection = () => {
        props.create('s')
    }

    return (props.action === 'create' ? (
        <div className="section-card ">
            <div className="section-title-container">
                <Btn className={"section-title"}
                    html={"New Section"}
                    onClick={createSection}
                />
            </div>
        </div>
    ) : (
        <div className="section-card ">
            <div className="section-title-container">
                <Btn className={props.section.active ? "section-title section-active highlight-thin" : "section-title"}
                    html={props.section.title || "No Title!"}
                    onClick={sectionClicked}
                    type={props.section.active ? "" : "rounded"}
                />
            </div>
            <div className="questions-card flex wrap">
                {
                    props.section.questions.map((question, questionNo) => {
                        return (
                            <QuestionBtn question={question} action='edit'
                                key={'edit' + question.qid}
                                change={props.change}
                            />
                        )
                    })
                }
                {/* doesn't need the key though :p */}
                <QuestionBtn action='create'
                    key={'createq' + props.section.sid}
                    create={props.create}
                    sno={props.section.sno}
                    sid={props.section.sid}
                />
            </div>
        </div>
    ))
}

export default SectionCard