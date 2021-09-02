import React, { Component } from 'react'
import TableHeading from './heading'
import Table from './index'

export default class QuizResult extends Component {
    render() {
        return (
            <div className='grid table-container'>
                <TableHeading value='Results' />
                <Table headRow='true'/>
                <table className="resultTable">{this.props.result}</table> 
            </div>
        )
    }
}