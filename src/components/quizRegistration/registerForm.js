import React, { Component } from 'react'
import KeyValInputRow from '../keyValInputRow'
import DateTimeInput from '../dateTimeInput'
import Btn from '../buttons/btn'
import moment from 'moment'
import '../../styles/modules/createQuizForm.scss'

export default class QuizRegisterForm extends Component {

    render() {
        return (
            <div className = "flex column space-evenly createQuizTitleContainer">
                <div className = "createQuizTitle">
                    Create Quiz
                </div>
                <div className = "flex column space-between formContainer">
                    <KeyValInputRow title="Quiz Name:" type="text" placeholder="Eg: The maths quiz" name="title" value={this.props.data.title} onChange={this.props.onUpdate} />
                    <div className = "flex row formRow">
                        <div className = "inputTitleContainer">
                            <div className = "inputTitle">Start Time:</div>
                        </div>
                        <DateTimeInput onChange={this.props.onChangeStart} initValue={this.props.data.startTime || moment()}/>
                    </div>
                    <div className = "flex row formRow">
                        <div className = "inputTitleContainer">
                            <div className = "inputTitle">End Time:</div>
                        </div>
                        <DateTimeInput onChange={this.props.onChangeEnd} initValue={this.props.data.endTime || moment()}/>
                    </div>
                    <KeyValInputRow title="Access-code:" type="text" placeholder="access-code" name="accessCode" value={this.props.data.accessCode} onChange={this.props.onUpdate} />
                    <KeyValInputRow title="Group ID:" type="text" placeholder="optional" name="groupId" value={this.props.data.groupId} onChange={this.props.onUpdate} />
                    {/* <KeyValInputRow title="Public:" type="checkbox" checked={this.props.data.public} name="public" onChange={this.props.onUpdate} /> */}
                    <div className = "btn-container">
                        <Btn className="submit-btn-signup" type="rounded" html="Create" onClick={this.props.onSubmit} />
                    </div>
                </div>
            </div>
        )
    }
}
