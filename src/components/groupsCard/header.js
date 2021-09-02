import React, { Component } from 'react'
import Btn from '../buttons/btn'

export default class Header extends Component {
    switchToExplore = () => {
        if (this.props.state === 1) {
            this.props.toggleState()
        }
    }

    switchToMyGroups = () => {
        if (this.props.state === 0) {
            this.props.toggleState()
        }
    }

    render() {
        let className = ["", ""]
        if (this.props.state === 0) {
            className[0] += "highlight"
        } else {
            className[1] += "highlight"
        }
        return (
            <div className = "group-card-header-container">
                <div className="group-card-header flex wrap">
                    <Btn className="group-card-toggle"
                        onClick={this.switchToExplore}
                        html={<div className={className[0]}>Explore</div>} />

                    <Btn className="group-card-toggle"
                        onClick={this.switchToMyGroups}
                        html={<div className={className[1]}>My Groups</div>} />

                </div>
                <div className = "create-group-btn-container">
                    <div className = "create-group-label">Create Group</div>
                    <div className="group-card-btn">
                            <Btn type="round"
                            className="create-group-btn"
                            html="+" />
                    </div>
                </div>

            </div>
        )
    }
}