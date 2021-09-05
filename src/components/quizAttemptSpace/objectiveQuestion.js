import React, { Component } from 'react'

const ObjectiveQuestion = (props) => {
    let data = props.data


    const onChange = (event) => {
        props.onUpdate(data.sno, data.qno, event.target.value)
    }

    return (
        <form className="qoptions">
            {data.options.map((option, optionNo) => (
                <label key={optionNo} className={data.submitted === option ? "qoption submitted" : "qoption"}>
                    <input type="radio" value={option} checked={data.answer === option} onChange={onChange} />
                    {option}
                </label>
            ))}
        </form>
    )

}

export default ObjectiveQuestion