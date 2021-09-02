import React, { Component } from 'react'
import '../../styles/modules/quizAttemptSpace.scss'
import MarkDown from '../../parser/markdown'

export default class Section extends Component {

    constructor(props) {
        super(props)
        this.tabNavWriteTitle = "btn-link navSelected"
        this.tabNavPreviewTitle = "btn-link"
        this.state = {
            writeBody: true,
            writeTitle: true,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    onChange = (event) => {
        const target = event.target
        let upd = {};
        upd[target.name] = target.value;
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, upd)
    }

    handleClick(fieldName, e) {
        if(fieldName === "writeTitle") {
            this.setState({...this.state, 
                writeTitle: true
            })
            this.tabNavWriteTitle = "btn-link navSelected"
            this.tabNavPreviewTitle = "btn-link"
        } else if(fieldName === "previewTitle") {
            this.setState({...this.state, 
                writeTitle: false
            })
            this.tabNavWriteTitle = "btn-link"
            this.tabNavPreviewTitle = "btn-link navSelected"
        }
    }

    render() {
        return (
            <div className="section-modal align-center">
                <div className="section-modal-heading center-text">
                    <input className="section-modal-heading-input center-text" name='title' value = {this.props.data.title} onChange={this.onChange}>
                    </input>
                </div>
                <div className="section-modal-body">
                    <nav className="tabnav align-center"> 
                        <button type="button" className={this.tabNavWriteTitle + " write-tab"} onClick={(e) => this.handleClick("writeTitle", e)}>
                            Write
                        </button>
                        <button type="button" className={this.tabNavPreviewTitle + " preview-tab"} onClick={(e) => this.handleClick("previewTitle", e)}>
                            Preview
                        </button>
                    </nav>
                    <div className="sbody response-container">
                        {  this.state.writeTitle ?
                            <textarea className="response-container response-textarea align-center" value={this.props.data.description} name="description" onChange={this.onChange}></textarea> 
                            : <MarkDown code={this.props.data.description}/>
                        }
                    </div>
                    <div className="sinfo">
                        <div className="s-noOfQuestions">
                            No. of questions: {this.props.data.noOfQuestions || 0}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}