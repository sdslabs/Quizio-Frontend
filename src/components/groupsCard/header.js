import React, { Component } from 'react'
import Btn from '../buttons/btn'

const Header = (props) => {

    const switchToExplore = () => {
        props.state === 1 && props.toggleState()
    }

    const switchToMyGroups = () => {
        props.state === 0 && props.toggleState()
    }

    return (
        <div className="group-card-header-container">
            <div className="group-card-header flex wrap">
                <Btn className="group-card-toggle"
                    onClick={switchToExplore}
                    html={<div className={props.state === 0 ? "highlight" : ""}>Explore</div>} />

                <Btn className="group-card-toggle"
                    onClick={switchToMyGroups}
                    html={<div className={props.state != 0 ? "highlight" : ""}>My Groups</div>} />

            </div>
            <div className="create-group-btn-container">
                <div className="create-group-label">Create Group</div>
                <div className="group-card-btn">
                    {/* Need to have better */}
                    <Btn type="round"
                        className="create-group-btn"
                        html="+" />
                </div>
            </div>

        </div>
    )

}

export default Header