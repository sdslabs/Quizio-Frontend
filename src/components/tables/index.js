import React from 'react'
import '../../styles/modules/tables.scss'

import Quiz from './quiz';
import HeadRow from './headRow';


const Table = (props) => {
    return (
        <div className='flex table-container'>
            {props.headRow && <HeadRow />}
            {props.quizzes.map((quizId, index) => <Quiz quizId={quizId} sNo={index + 1} past={props.past} />)}
        </div>
    )
}

export default Table