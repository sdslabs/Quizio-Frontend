import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import '../styles/modules/quizAttemptSpace.scss'

export default class MarkDown extends Component {
    constructor (props) {
        super(props)
        this.state = { md: this.props.code }
    }

    static getDerivedStateFromProps(newProps) {
        return {
            md: newProps.code
        }
    }

    render() {
        let { md } = this.state
        if(md == null) {
            return null
        }
        return (
            <div className="inline markdown-inline">
                <ReactMarkdown source={md} escapeHtml={!this.props.keepHtml}/>
            </div>
        )
    }
}
