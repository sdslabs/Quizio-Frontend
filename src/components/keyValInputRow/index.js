import React, { Component } from 'react'
import '../../styles/modules/keyValInputRow.scss'

const KeyValInputRow = (props) => {
    return (
        <div className="flex row formRow">
            <div className="inputTitleContainer">
                <div className="inputTitle">{props.title}</div>
            </div>
            {props.type == "checkbox" &&
                <input className="inputBox"
                    type={props.type}
                    name={props.name}
                    checked={props.checked}
                    onChange={props.onChange} />
            }
            {props.type != "checkbox" &&
                <input className="inputBox"
                    type={props.type}
                    placeholder={props.placeholder || ''}
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    readOnly={props.readOnly || false} />
            }
        </div>
    )

}
export default KeyValInputRow