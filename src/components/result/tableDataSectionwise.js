import React, { Component } from 'react'

export default class TableDataSectionwise extends Component {
    render() {
        let {quizId, username, userResult, sNo, userData} = this.props
        
        return (
            <div className='table-row'>
                <div className='text rank'>{sNo}</div>
                <div className='text username quiz-name-text'><a className='quiz-name-text' href={"/results/user/" + quizId + "?username=" + username}>{username}</a></div>
                <div className="text name">{userData.name}</div>
                <div className='text marks'>{userResult}</div>
                <div className='text email'>{userData.email}</div>
                <div className='text contact'>{userData.mobile}</div>
                <div className='text insti'>{userData.organisation}</div>
            </div>
        )
    }
}