import React, { Component } from 'react'
import '../../styles/modules/noQuizzes.scss'

const noQuizzes = (props) => {

    return (
        <div>
            {props.showImg && (<div className="noquizzes-container"></div>)}
            <div className="sectionText">
                {props.section}
            </div>
        </div>

    )

}

export default noQuizzes