import React from 'react'
import '../../styles/modules/tables.scss'

const HeadRow = () => {
    return (
        <div className='table-row table-row-header' id='top'>
            <div className='text quiz-serial-no'>S. no</div>
            <div className='text quiz-name'>Quiz Name</div>
            <div className='text quiz-description'>Description</div>
            <div className='text quiz-startTime'>Start Time</div >
            <div className='text quiz-duration'>Duration</div >
            <div className='text register'>Registration</div >
        </div>
    )
}
export default HeadRow