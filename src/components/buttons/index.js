import React from 'react'
import '../../assets/styles/buttons.scss'

const Btn = (props) => {

    return (
        <button
            className={props.type + ' ' + props.className || ''}
            onClick={props.onClick || {}}
            name={props.name || ''}
        >
            {props.html || 'Button' /* TODO: Use props.children here */}
        </button>
    )
}

export default Btn