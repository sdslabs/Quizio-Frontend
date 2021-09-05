import React from 'react';
import '../../styles/modules/userDashboard.scss'

const UserDashboard = (props) => {

    return (
        <div className="container">
            <div className="img-container">
                <div className="profile-pic">
                    {(props.name[0]).toUpperCase()}
                </div>
            </div>
            <div className="info-box">
                <div className="name-box">
                    {props.name}
                </div>

                <div className="bio-box">
                    {props.bio}
                </div>
            </div>
            <div className="stat-container">
                <div className="stat-box">
                    <div className="stat-name">
                        Created Quizes
                    </div>
                    <div className="stat-1">
                        {props.lenCreatedQuizzes ? Object.keys(props.lenCreatedQuizzes).length : 0}
                    </div>

                </div>
                <div className="stat-box">
                    <div className="stat-name">
                        Paricipated Quizes
                    </div>
                    <div className="stat-2">
                        {props.lenRegisteredQuizzes ? Object.keys(props.lenRegisteredQuizzes).length : 0}
                    </div>
                </div>

                <div className="stat-box" id="sb1">
                    <div className="stat-name">
                        Groups
                    </div>
                    <div className="stat-3">
                        {props.lenGroups ? Object.keys(props.lenGroups).length : 0}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default UserDashboard