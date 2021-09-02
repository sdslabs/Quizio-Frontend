import React, { Component } from 'react'
import '../../styles/modules/tables.scss'

 export default class HeadRow extends Component {
    render() {
        return (
                <div className='table-row table-row-header' id='top'>
                    <div className='text rank'>Rank</div>
                    <div className='text username'>Username</div>
                    <div className="text name">Name</div>
                    <div className='text marks'>Marks</div>
                    <div className='text email'>E-mail</div >
                    <div className='text contact'>Contact</div >
                    <div className='text insti'>Institute/Organization</div >
                </div>
        )
    }
}