import React, { Component } from 'react'
import MarkDown from '../../parser/markdown'

export default class Section extends Component {
    render() {
        const data = this.props.data
        return (
            <div className="section-modal align-center">
                <div className="section-modal-heading center-text">
                    Section{data.sno + 1}. {data.title}
                </div>
                <div className="section-modal-body">
                    <div className="sbody">
                        <MarkDown code={data.body}/>
                    </div>
                    <div className="sinfo">
                        <div className="s-noOfQuestions">
                            No. of questions: {data.info.noOfQuestions || 0}
                        </div>
                        <div className="smarks">
                            Total marks: {data.info.marks || 0}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}