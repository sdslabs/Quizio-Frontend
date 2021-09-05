import React, { Component } from 'react'
import '../../styles/modules/textBox.scss'

const Textbox = (props) => {

    return (
        <div className="container">
            <input type="text"
                name={props.name}
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onchange}
                required={props.req}
            >

            </input>
        </div>
    )

}
export default Textbox