import React, { Component, useState } from 'react'
import MarkDown from '../../parser/markdown'

const SubjectiveQuestion = (props) => {

    const data = props.data
    const [write, setWrite] = useState(true)

    let tabNavPreview = "btn-link"
    let tabNavWrite = "btn-link navSelected"
    let responseContainer = []
    let ans = data.answer || ""

    if (data.ansType === "long") {
        responseContainer.push(<textarea className="response-container response-textarea align-center" id="my-textarea" value={ans} onChange={onChange} key="0" onKeyDown={keyDown}
        />)
    } else {
        responseContainer.push(<input className="response-container response-input" value={ans} onChange={onChange} key="0" />)
    }

    const keyDown = (evt) => {
        // todo: no hardcoding
        if (evt.keyCode === 9) {
            evt.preventDefault();

            let val = evt.target.value,
                start = evt.target.selectionStart,
                end = evt.target.selectionEnd;
            evt.target.value = val.substring(0, start) + '\t' + val.substring(start);
            evt.target.selectionStart = evt.target.selectionEnd = start + 1;
            props.onUpdate(props.data.sno, props.data.qno, evt.target.value)

        }

    }
    const handleClick = (fieldName, e) => {
        if (fieldName == "write") {
            setWrite(true)
            tabNavWrite = "btn-link navSelected"
            tabNavPreview = "btn-link"
        } else if (fieldName == "preview") {
            setWrite(false)
            tabNavWrite = "btn-link"
            tabNavPreview = "btn-link navSelected"
        }
    }

    const onChange = (event) => {
        props.onUpdate(data.sno, data.qno, event.target.value)
    }

    return (
        <div>
            <form className="response">
                {
                    data.ansType === "long" ?
                        <nav className="tabnav align-center">
                            <button type="button" className={tabNavWrite + " write-tab"} onClick={(e) => handleClick("write", e)}>
                                Write
                            </button>
                            <button type="button" className={tabNavPreview + " preview-tab"} onClick={(e) => handleClick("preview", e)}>
                                Preview
                            </button>
                        </nav> :
                        ''
                }
                {
                    (write || data.ansType !== "long") ?
                        responseContainer.map((container, containerNo) => {
                            return container
                        }) :
                        <div className="align-center preview">
                            <pre>
                                <MarkDown code={ans || ""} />
                            </pre>
                        </div>
                }
            </form>

            <div className={data.submitted ? "submission align-center" : "submission align-center hidden"}>
                <pre>
                    <MarkDown code={data.submitted || ""} />
                </pre>
            </div>
        </div >
    )
}


export default SubjectiveQuestion