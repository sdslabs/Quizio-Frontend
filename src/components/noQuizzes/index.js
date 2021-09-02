import React, { Component } from 'react'
import '../../styles/modules/noQuizzes.scss'

export default class noQuizzes extends Component {
    render() {
        return (
            <div>
                { this.props.showImg ? 
                    <div className="noquizzes-container">
                    </div>:
                    ''  }
                <div className="sectionText">
                    {this.props.section}
                </div>
            </div>

        )
    }
}
