import React, { Component } from 'react'
import Btn from '../buttons/btn'
import QuestionBtn from './questionBtn'

export default class SectionCard extends Component {
    sectionClicked = () => {
        this.props.change('s', this.props.section.sno)
    }

    createSection = () => {
        this.props.create('s')
    }

    render() {
        // console.log(this.props, 'section')
        if(this.props.action === 'create'){
            return (
                <div className="section-card ">
                    <div className="section-title-container">
                        <Btn className={"section-title"}
                            html={"New Section"}
                            onClick={this.createSection} 
                        />
                    </div>
                </div>
            )
        }
        else{
            let sectionClassName = "section-title "
            let type = "rounded"
            if (this.props.section.active) {
                sectionClassName += "section-active highlight-thin"
                type = ""
            }
            return (
                <div className="section-card ">
                    <div className="section-title-container">
                        <Btn className={sectionClassName}
                            html={this.props.section.title || "No Title!"}
                            onClick={this.sectionClicked}
                            type={type}
                        />
                    </div>
                    <div className="questions-card flex wrap">
                        {
                            this.props.section.questions.map((question, questionNo) => {
                                return (
                                    <QuestionBtn question={question} action='edit'
                                        key={'edit' + question.qid}
                                        change={this.props.change}
                                    />
                                )
                            })
                        }
                        {/* doesn't need the key though :p */}
                        <QuestionBtn action='create'
                                key= {'createq' + this.props.section.sid}
                                create={this.props.create}
                                sno={this.props.section.sno}
                                sid={this.props.section.sid}
                        />
                    </div>
                </div>
            )
        }
    }
}