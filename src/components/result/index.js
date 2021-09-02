import React, { Component } from 'react'
import '../../styles/modules/result.scss'
import '../../styles/modules/tables.scss'
import Quiz from './tableData';
import QuizSectionwise from './tableDataSectionwise';
import HeadRow from './resultTable';

export default class Table extends Component {
    render() {
        let {overAll, headRow, quizId, username, userResult, Sno, userData, custom, sectionIndex} = this.props

        return (
            <div className='flex table-container'>
                {headRow ? <HeadRow /> 
                         : (overAll ? <Quiz quizId={quizId} username={username} userResult={userResult} sNo={Number(Sno)+1} userData={userData} custom={custom} sectionIndex={sectionIndex}/> 
                                    : <QuizSectionwise quizId={quizId} username={username} userResult={userResult} sNo={Number(Sno)+1} userData={userData}/>
                            )
                }
            </div>
        )
    }
}