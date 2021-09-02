import React, { Component } from 'react'
import '../../styles/modules/tables.scss'

export default class HeadRow extends Component {
    render() {
        return (
            <div className='table-row table-row-header' id='top'>
                <div className='text registrants-serial-no'>S. no</div>
                <div className='text enrollment'>En. no</div>
                <div className="text registered-name">Name</div>
                <div className='text registered-email'>E-mail</div>
                <div className='text registered-contact'>Contact</div>
                <div className='text registered-course'>Course</div>
                <div className='text registered-insti'>Branch</div>
                <div className='text registered-social'>social</div>
            </div>
        )
    }
}
