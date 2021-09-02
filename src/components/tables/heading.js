import React, { Component } from 'react'
import '../../styles/modules/header.scss'

export default class TableHeading extends Component {
    render() {
        let value = this.props.value || 'Quizzes'
        return (
            <div className='heading' >
                <div className='logo heading-logo'>{value}</div>
            </div>
        )
    }
} 
