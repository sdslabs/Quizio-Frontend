import React, { Component } from 'react'
import '../../styles/modules/result.scss'
import '../../styles/modules/tables.scss'
import HeadRow from './headRow'
import Quiz from './tableData'

export default class RegistrantsTable extends Component {
    render() {
        let {headRow, quizId, registrant, Sno} = this.props

        return (
            <div className='flex table-container'>
                {headRow ? <HeadRow /> 
                         : <Quiz quizId={quizId} Sno={Number(Sno)+1} registrant={registrant} /> 
                }
            </div>
        )
    }
}