import React, { Component } from 'react'
import KeyValInputRow from '../keyValInputRow'
import DateTimeInput from '../dateTimeInput'
import Btn from '../buttons/btn'
import moment from 'moment'
import '../../styles/modules/createQuizForm.scss'

const QuizRegisterForm = (props) => {

    return (
        <div className="flex column space-evenly createQuizTitleContainer">
            <div className="createQuizTitle">
                Create Quiz
            </div>
            <div className="flex column space-between formContainer">
                <KeyValInputRow title="Quiz Name:" type="text" placeholder="Eg: The maths quiz" name="title" value={props.data.title} onChange={props.onUpdate} />
                <div className="flex row formRow">
                    <div className="inputTitleContainer">
                        <div className="inputTitle">Start Time:</div>
                    </div>
                    <DateTimeInput onChange={props.onChangeStart} initValue={props.data.startTime || moment()} />
                </div>
                <div className="flex row formRow">
                    <div className="inputTitleContainer">
                        <div className="inputTitle">End Time:</div>
                    </div>
                    <DateTimeInput onChange={props.onChangeEnd} initValue={props.data.endTime || moment()} />
                </div>
                <KeyValInputRow title="Access-code:" type="text" placeholder="access-code" name="accessCode" value={props.data.accessCode} onChange={props.onUpdate} />
                <KeyValInputRow title="Group ID:" type="text" placeholder="optional" name="groupId" value={props.data.groupId} onChange={props.onUpdate} />
                {/* <KeyValInputRow title="Public:" type="checkbox" checked={props.data.public} name="public" onChange={props.onUpdate} /> */}
                <div className="btn-container">
                    <Btn className="submit-btn-signup" type="rounded" html="Create" onClick={props.onSubmit} />
                </div>
            </div>
        </div>
    )
}

export default QuizRegisterForm
