import React, { Component } from 'react'
import '../../styles/modules/result.scss'
import '../../styles/modules/tables.scss'
import HeadRow from './headRow'
import Quiz from './tableData'

const RegistrantsTable = (props) => {

    return (
        <div className='flex table-container'>
            {props.headRow ? <HeadRow />
                : <Quiz
                    quizId={props.quizId}
                    Sno={Number(props.Sno) + 1}
                    registrant={props.registrant}
                />
            }
        </div>
    )
}


export default RegistrantsTable