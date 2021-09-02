import React, { Component } from 'react'
import '../../styles/modules/header.scss'

 export default class TableHeading extends Component {
    render() {
        return (
            <div className='heading' >
                <div className='logo heading-logo'>{this.props.value}</div>
            </div>
        )
    }
}