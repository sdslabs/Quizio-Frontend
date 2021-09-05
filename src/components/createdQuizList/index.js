import React from 'react';
import '../../styles/modules/createdQuizTable.scss'
import config from '../../config/config'

const CreatedQuizList = (props) => {

    // TODO: use onClick instead of href
    const adminPanelLink = () => {
        return config.baseURL + 'admin/' + props.id
    }
    const resultPaneLine = () => {
        return config.baseURL + 'results/' + props.id
    }
    return (
        <div>
            <div className="container-quiz">
                <div className="info-tab">
                    <a href={adminPanelLink()} className="link-quiz">{props.name}</a>
                </div>
                <div className="info-tab">
                    {props.date}
                </div>
                <div className="info-tab">
                    {props.group ? props.group : 'Public'}
                </div>
                <div className="info-tab">
                    <a href={resultPaneLine()} className="link1">View Results</a>
                </div>
            </div>
        </div>
    )
}
export default CreatedQuizList