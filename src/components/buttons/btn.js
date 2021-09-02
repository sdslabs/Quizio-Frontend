import React, { Component } from 'react'
import '../../styles/modules/buttons.scss'

export default class Btn extends Component {
    render() {
        const html = this.props.html || 'Button';
        let className='';

        switch(this.props.type) {
            case 'rounded':
                className += ' rounded';
                break;
            case 'round':
                className += ' round';
                break;
            default:
        }

        if (this.props.className) className += ' ' + this.props.className;

        const onClick = this.props.onClick || function(){}
        const name = this.props.name || ''
        return (
            <button className={className} onClick={onClick} name={name}>
                {html}
            </button>
        )
    }
}
