import React, { Component, useState } from 'react'
import '../../styles/modules/quizAttemptSpace.scss'
import MarkDown from '../../parser/markdown'

const Section = (props) => {
    let tabNavWriteTitle = "btn-link navSelected"
    let tabNavPreviewTitle = "btn-link"
    const [writeTitle, setWriteTitle] = useState(true)


    const onChange = (event) => {
        const target = event.target
        let upd = {};
        upd[target.name] = target.value;
        props.onUpdate(props.data.sno, props.data.qno, upd)
    }

    const handleClick = (fieldName, e) => {
        if (fieldName === "writeTitle") {
            setWriteTitle(true)
            tabNavWriteTitle = "btn-link navSelected"
            tabNavPreviewTitle = "btn-link"
        } else if (fieldName === "previewTitle") {
            setWriteTitle(false)
            tabNavWriteTitle = "btn-link"
            tabNavPreviewTitle = "btn-link navSelected"
        }
    }

    return (
        <div className="section-modal align-center">
            <div className="section-modal-heading center-text">
                <input className="section-modal-heading-input center-text" name='title' value={props.data.title} onChange={onChange}>
                </input>
            </div>
            <div className="section-modal-body">
                <nav className="tabnav align-center">
                    <button type="button" className={tabNavWriteTitle + " write-tab"} onClick={(e) => handleClick("writeTitle", e)}>
                        Write
                    </button>
                    <button type="button" className={tabNavPreviewTitle + " preview-tab"} onClick={(e) => handleClick("previewTitle", e)}>
                        Preview
                    </button>
                </nav>
                <div className="sbody response-container">
                    {writeTitle ?
                        <textarea className="response-container response-textarea align-center" value={props.data.description} name="description" onChange={onChange}></textarea>
                        : <MarkDown code={props.data.description} />
                    }
                </div>
                <div className="sinfo">
                    <div className="s-noOfQuestions">
                        No. of questions: {props.data.noOfQuestions || 0}
                    </div>
                </div>
            </div>
        </div>
    )

}
export default Section