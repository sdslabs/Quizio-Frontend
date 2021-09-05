import React, { Component } from 'react'

const TableData = (props) => {

    let { quizId, registrant, Sno } = props

    return (
        <div className='table-row'>
            <div className='text registrants-serial-no'>{Sno}</div>
            <div className='text enrollment'>{registrant.enrollment}</div>
            <div className="text registered-name"><a className='quiz-name-text' href={"/results/user/" + quizId + "?username=" + registrant._id} target="_blank">{registrant.name}</a></div>
            <div className='text registered-email'>{registrant.email}</div>
            <div className='text registered-contact'>{registrant.mobile}</div>
            <div className='text registered-course'>{registrant.course}</div>
            <div className='text registered-insti'>{registrant.organisation}</div>
            <div className='text registered-social'>
                <span className='social-body'><a className='quiz-name-text' href={registrant.github} target="_blank">github</a></span>
                <span className='social-body'><a className='quiz-name-text' href={registrant.codeforces} target="_blank">codeforce</a></span>
                <span className='social-body'><a className='quiz-name-text' href={registrant.codechef} target="_blank">codechef</a></span>
            </div>
        </div>
    )

}

export default TableData