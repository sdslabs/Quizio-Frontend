import React, { Component } from 'react'
import Btn from '../buttons/btn'
import '../../styles/modules/quizAttemptSpace.scss'
import MarkDown from '../../parser/markdown'
import KeyValInputRow from '../keyValInputRow'
import DateTimeInput from '../dateTimeInput'
import moment from 'moment'

const QuizEditor = (props) => {
    // Redundant code, violates DRY
    let tabNavWriteTitle = "btn-link navSelected"
    let tabNavPreviewTitle = "btn-link"
    let tabNavWriteBody = "btn-link navSelected"
    let tabNavPreviewBody = "btn-link"

    const [writeBody, setWriteBody] = useState(true)
    const [writeTitle, setWriteTitle] = useState(true)

    const onChange = (event) => {
        const target = event.target
        let upd = {};
        upd[target.name] = target.value;
        props.onUpdate(props.data.sno, props.data.qno, upd)
    }

    const onChangeStart = (value) => {
        let upd = {};
        upd['startTime'] = value;
        props.onUpdate(props.data.sno, props.data.qno, upd)
    }

    const onChangeEnd = (value) => {
        let upd = {};
        upd['endTime'] = value;
        props.onUpdate(props.data.sno, props.data.qno, upd)
    }

    const onOwnerChange = (event) => {
        const target = event.target
        let value = target.value
        let newOwners = props.data.owners
        newOwners = newOwners.map((Owner) => {
            if (Owner.id == target.name) {
                Owner.val = value
            }
            return Owner
        })
        props.onUpdate(props.data.sno, props.data.qno, { owners: newOwners })
    }

    const onOwnerDelete = (event) => {
        const target = event.target
        let newOwners = props.data.owners.filter((owner) => owner.id != target.name)
        props.onUpdate(props.data.sno, props.data.qno, { owners: newOwners })
    }

    const onOwnerAdd = (event) => {
        let newOwners = props.data.owners
        let lastId
        if (newOwners.length === 0) {
            newOwners.push({
                id: 0,
                val: ""
            })
        }
        else {
            lastId = newOwners[newOwners.length - 1].id
            newOwners.push({
                id: lastId + 1,
                val: ""
            })
        }
        props.onUpdate(props.data.sno, props.data.qno, { owners: newOwners })
    }

    const handleClick = (fieldName, e) => {

        switch (fieldName) {
            case "writeTitle":
                setWriteTitle(true)
                tabNavWriteTitle = "btn-link navSelected"
                tabNavPreviewTitle = "btn-link"
                break;
            case "writeBody":
                setWriteTitle(true)
                tabNavWriteTitle = "btn-link navSelected"
                tabNavPreviewTitle = "btn-link"
                break;
            case "previewBody":
                setWriteBody(false)
                tabNavWriteBody = "btn-link"
                tabNavPreviewBody = "btn-link navSelected"
                break;
            case "previewTitle":
                setWriteTitle(false)
                tabNavWriteTitle = "btn-link"
                tabNavPreviewTitle = "btn-link navSelected"
                break;

            default:
                break;
        }
    }

    return (
        <div className="section-modal align-center">
            <KeyValInputRow title="Title:" type="text" name="title" placeholder="Quiz-Title" value={props.data.title} onChange={onChange} />
            <div className="flex row formRow">
                <div className="inputTitleContainer">
                    <div className="inputTitle">Start Time:</div>
                </div>
                <DateTimeInput onChange={onChangeStart} initValue={props.data.startTime || moment()} />
            </div>
            <div className="flex row formRow">
                <div className="inputTitleContainer">
                    <div className="inputTitle">End Time:</div>
                </div>
                <DateTimeInput onChange={onChangeEnd} initValue={props.data.endTime || moment()} />
            </div>

            <KeyValInputRow title="Owners:" type="text" name="ownerSize" value={props.data.owners.length} onChange={onChange} readonly={true} />
            {props.data.owners.map(owner => {
                return (
                    <div key={owner.id} className="flex qoption">
                        <div className="inputTitleContainer">
                            <div className="inputTitle">
                                <Btn className="question-btn"
                                    type="round"
                                    html="-"
                                    onClick={onOwnerDelete}
                                    name={owner.id}
                                />
                            </div>
                        </div>
                        <input className="inputBox" type="text" value={owner.val} name={owner.id} placeholder="Owner" onChange={onOwnerChange} />
                    </div>
                )
            })}
            {/* <div>
                    <button className="question-btn" onClick={onOwnerAdd} >+</button>
                </div> */}
            <div className="inputTitleContainer">
                <div className="inputTitle">
                    <Btn className="question-btn"
                        type="round"
                        html="+"
                        onClick={onOwnerAdd}
                    />
                </div>
            </div>

            <div className="question-modal-body">
                <nav className="tabnav align-center">
                    <button type="button" className={tabNavWriteTitle + " write-tab"} onClick={(e) => handleClick("writeTitle", e)}>
                        Write
                    </button>
                    <button type="button" className={tabNavPreviewTitle + " preview-tab"} onClick={(e) => handleClick("previewTitle", e)}>
                        Preview
                    </button>
                </nav>
                <div className="center-text flex">
                    {writeTitle ?
                        <textarea className="response-container response-textarea align-center" value={props.data.description} placeholder="Description" name="description" onChange={onChange}></textarea>
                        : <MarkDown code={props.data.description} />
                    }
                </div>
            </div>

            <div className="question-modal-body">
                <nav className="tabnav align-center">
                    <button type="button" className={tabNavWriteBody + " write-tab"} onClick={(e) => handleClick("writeBody", e)}>
                        Write
                    </button>
                    <button type="button" className={tabNavPreviewBody + " preview-tab"} onClick={(e) => handleClick("previewBody", e)}>
                        Preview
                    </button>
                </nav>
                <div className="flex center-text">
                    {writeBody ?
                        <textarea className="response-container response-textarea align-center" value={props.data.instructions} placeholder="Instructions" name="instructions" onChange={onChange}></textarea>
                        : <MarkDown code={props.data.instructions} />
                    }
                </div>
            </div>

            <KeyValInputRow title="Access-code:" type="text" name="accessCode" placeholder="access-code" value={props.data.accessCode} onChange={onChange} />
            {/* <KeyValInputRow title="Public:" type="checkbox" name="public" value={props.data.public} onChange={onChange} />  */}
        </div>
    )

}

export default QuizEditor