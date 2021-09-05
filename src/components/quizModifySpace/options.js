import React, { Component } from 'react'
import '../../styles/modules/keyValInputRow.scss'
import Btn from '../buttons/btn'

const ObjectiveQuestion = (props) => {

    const onChange = (event) => {
        props.onUpdate(props.data.sno, props.data.qno, event.target.value)
    }

    const onOptionChange = (event) => {
        let newOptions = props.data.options.map((option) => {
            if (option.id == event.target.name) {
                option.val = event.target.value
            }
            return option
        })
        props.onUpdate(props.data.sno, props.data.qno, { options: newOptions })
    }

    const onOptionDelete = (event) => {
        let newOptions = props.data.options.filter((option) => option.id != event.target.name)
        props.onUpdate(props.data.sno, props.data.qno, { options: newOptions })
    }

    const onOptionAdd = (event) => {
        let newOptions = props.data.options
        let lastId;
        if (newOptions.length === 0) {
            newOptions.push({
                id: 0,
                val: ""
            })
        } else {
            lastId = newOptions[newOptions.length - 1].id
            newOptions.push({
                id: lastId + 1,
                val: ""
            })
        }
        props.onUpdate(props.data.sno, props.data.qno, { options: newOptions })
    }

    return (
        <div className="qoptions">
            {props.data.options.map((option, optionNo) => (
                <div key={optionNo} className={props.data.submitted === option ? "flex qoption submitted" : "flex qoption"}>
                    {/* {console.log(optionNo)} */}
                    <div className="inputTitleContainer">
                        <div className="inputTitle">
                            <Btn className="question-btn"
                                type="round"
                                html="-"
                                onClick={onOptionDelete}
                                name={option.id}
                            />
                            {/* <button className="question-btn" onClick={onOptionDelete} name={option.id}>-</button> */}
                        </div>
                    </div>
                    <input className="inputBox" type="text" key={props.data.sid + props.data.qid + option.id} value={option.val} name={option.id} onChange={onOptionChange} />
                </div>
            ))}
            <div key="addQuestion" className="inputTitleContainer">
                <div className="inputTitle">
                    <Btn className="question-btn"
                        type="round"
                        html="+"
                        onClick={onOptionAdd}
                    />
                </div>
            </div>
        </div>
    )

}
export default ObjectiveQuestion
