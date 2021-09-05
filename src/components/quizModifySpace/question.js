import React, { Component, useState } from 'react'
import Options from './options'
import Btn from '../buttons/btn'
import '../../styles/modules/quizAttemptSpace.scss'
import MarkDown from '../../parser/markdown'
import KeyValInputRow from '../keyValInputRow'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

const Question = (props) => {
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
        if (target.type === "checkbox")
            upd[target.name] = target.checked;
        props.onUpdate(props.data.sno, props.data.qno, upd)
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

    const goToPrevQuestion = (e) => {
        e.preventDefault();
        if (props.data.qno > 0) {
            props.change('q', props.data.sno, props.data.qno - 1)
        } else if (props.data.sno > 0) {
            props.change('q', props.data.sno - 1, props.quiz[props.data.sno - 1].questions.length - 1)
        }

    }

    const goToNextQuestion = (e) => {
        e.preventDefault();
        if (props.data.qno + 1 < props.quiz[props.data.sno].questions.length) {
            props.change('q', props.data.sno, props.data.qno + 1)
        } else if (props.data.sno + 1 < props.quiz.length) {
            props.change('q', props.data.sno + 1, 0)
        }
    }


    return (
        <div className="attempt-space">
            <div className="flex head-question-modal">
                <button type="button" className="arena-slider" onClick={goToPrevQuestion}>
                    <i className="fa fa-arrow-circle-o-left arrow arrow-items" aria-hidden="true"></i>
                </button>
                <div className="question-modal-heading">
                    <nav className="tabnav-with-question align-center">
                        <button type="button" className={tabNavWriteTitle + " write-tab"} onClick={(e) => handleClick("writeTitle", e)}>
                            Write
                        </button>
                        <button type="button" className={tabNavPreviewTitle + " preview-tab"} onClick={(e) => handleClick("previewTitle", e)}>
                            Preview
                        </button>
                    </nav>
                    <div className="center-text flex">
                        <div className="question-number inline">
                            Q{props.data.qno + 1}.
                        </div>
                        {writeTitle ?
                            <textarea className="response-container response-textarea-with-question align-center" value={props.data.title} name="title" onChange={onChange}></textarea>
                            : <MarkDown code={props.data.title} />
                        }
                    </div>
                </div>
                <button type="button" className="arena-slider" onClick={goToNextQuestion}>
                    <i className="fa fa-arrow-circle-o-right arrow arrow-items" aria-hidden="true"></i>
                </button>
            </div>
            <div className="question-modal align-center">
                <div className="question-modal-body">
                    <nav className="tabnav align-center">
                        <button type="button" className={tabNavWriteBody + " write-tab"} onClick={(e) => handleClick("writeBody", e)}>
                            Write
                        </button>
                        <button type="button" className={tabNavPreviewBody + " preview-tab"} onClick={(e) => handleClick("previewBody", e)}>
                            Preview
                        </button>
                    </nav>
                    <div className="qbody center-text">
                        {writeBody ?
                            <textarea className="response-container response-textarea align-center" value={props.data.body} name="body" onChange={onChange}></textarea>
                            : <MarkDown code={props.data.body} />
                        }
                    </div>
                    <div className="qbodySelect">
                        <KeyValInputRow title="isMCQ:" type="checkbox" checked={props.data.isMCQ} name="isMCQ" onChange={onChange} />
                        {props.data.isMCQ ?
                            <Options data={props.data} key="0" onUpdate={props.onUpdate} /> :
                            null
                        }
                    </div>
                    <div className="qbodySelect">
                        <KeyValInputRow title="autoCheck:" type="checkbox" checked={props.data.autocheck} name="autocheck" onChange={onChange} />
                        {props.data.autocheck ?
                            <KeyValInputRow title="answer:" type="text" name="answer" value={props.data.answer} onChange={onChange} />
                            : ""
                        }
                    </div>
                    <div className="qbodySelect">
                        <KeyValInputRow title="Marks:" type="text" name="marks" placeholder="Eg: 2" value={props.data.marks} onChange={onChange} />
                    </div>
                </div>
            </div>
            <div className="response-buttons-container">
                <div id="submission-status" className="flex center">
                </div>
                <div className="flex center">
                    {props.data.actionOnSubmit == "create" ?
                        <Btn className="submit-btn-create"
                            type="rounded"
                            html={props.data.actionOnSubmit}
                            onClick={props.submit}
                        /> :
                        <Btn className="submit-btn"
                            type="rounded"
                            html={props.data.actionOnSubmit}
                            onClick={props.submit}
                        />
                    }
                    <Btn className="mark-btn"
                        type="rounded"
                        html="Delete"
                        onClick={props.delete}
                    />
                </div>
            </div>
        </div>
    )

}
export default Question