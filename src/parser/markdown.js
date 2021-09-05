import React, { Component, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import '../styles/modules/quizAttemptSpace.scss'

const MarkDown = (props) => {

    const [md, setMd] = useState(props.code)

    const getDerivedStateFromProps = (newProps) => {
        return {
            md: newProps.code
        }
    }

    return (
        md ? (
            <div className="inline markdown-inline">
                <ReactMarkdown source={md} escapeHtml={!props.keepHtml} />
            </div>
        ) : null
    )
}

export default MarkDown
