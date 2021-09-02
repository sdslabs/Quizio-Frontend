import React, { Component } from 'react'
import '../../styles/modules/tables.scss'
import Quiz from './quiz';
import HeadRow from './headRow';

export default class Table extends Component {
    render() {
        let {headRow, quizzes} = this.props
        return (
            <div className='flex table-container'>
                {headRow ? <HeadRow /> : ''}
                {
                    quizzes.map((quiz, index) => {
                    return (<Quiz quiz={quiz} sNo = {index+1} past={this.props.past}/>)
                    })
                }
            </div>
        )
    }
}