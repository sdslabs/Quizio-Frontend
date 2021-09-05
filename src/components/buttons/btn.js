import React from 'react'
import '../../styles/modules/buttons.scss'

const Btn = (props) => {

    return (
        <button
            className={props.type + ' ' + props.className || ''}
            onClick={props.onClick || {}}
            name={props.name || ''}
        >
            {props.html || 'Button'}
        </button>
    )
}

export default Btn