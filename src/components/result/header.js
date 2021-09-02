import React, { Component } from 'react'
import Btn from '../buttons/btn'

export default class Header extends Component {
    switchToOverall = () => {
        if (this.props.state !== 0) {
            this.props.toggleState(0)
        }
    }

    switchToSectionWise = () => {
        if (this.props.state !== 1) {
            this.props.toggleState(1)
        }
    }

    switchToCustom = () => {
        if (this.props.state !== 2) {
            this.props.toggleState(2)
        }
    }

    render() {
        let className = ["", "", ""]
        if (this.props.state === 0) {
            className[0] += "highlight"
        } else if (this.props.state === 1) {
            className[1] += "highlight"
        } else {
            className[2] += "highlight"
        }
        return (
            <div>
                <div className="quiz-header flex wrap center-text">
                    <div className="quizName highlight">
                        {this.props.quizName}
                    </div>
                    <div className="leaderBoard">
                        Leaderboard
                    </div>
                </div>
                <div className="result-header flex wrap">
                    <div className="sortBy">
                        Sort by:
                    </div>
                    <Btn className="result-toggle"
                        onClick={this.switchToOverall}
                        html={<div className={className[0]}>Overall</div>} />

                    <Btn className="result-toggle"
                        onClick={this.switchToSectionWise}
                        html={<div className={className[1]}>Section wise</div>} />

                    <Btn className="result-toggle"
                        onClick={this.switchToCustom}
                        html={<div className={className[2]}>Custom</div>} />
                </div>

                <div className="section-text">
                    Choose the sections that you want a customised result for.
                </div>

                {/* <Carousel noSections={this.props.sections.length} sections={this.props.sections}/> */}
            </div>
        )
    }
}