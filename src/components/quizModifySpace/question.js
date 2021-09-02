import React, { Component } from 'react'
import Options from './options'
import Btn from '../buttons/btn'
import '../../styles/modules/quizAttemptSpace.scss'
import MarkDown from '../../parser/markdown'
import KeyValInputRow from '../keyValInputRow'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

export default class Question extends Component {

    constructor(props) {
        super(props)
        this.tabNavWriteTitle = "btn-link navSelected"
        this.tabNavPreviewTitle = "btn-link"
        this.tabNavWriteBody = "btn-link navSelected"
        this.tabNavPreviewBody = "btn-link"
        this.state = {
            writeBody: true,
            writeTitle: true,
        }
        this.handleClick = this.handleClick.bind(this)
        this.goToPrevQuestion = this.goToPrevQuestion.bind(this)
        this.goToNextQuestion = this.goToNextQuestion.bind(this)
    }

    onChange = (event) => {
        const target = event.target
        let upd = {};
        upd[target.name] = target.value;
        if(target.type === "checkbox")
            upd[target.name] =  target.checked;
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, upd)
    }

    handleClick(fieldName, e) {
        if(fieldName === "writeTitle") {
            this.setState({...this.state, 
                writeTitle: true
            })
            this.tabNavWriteTitle = "btn-link navSelected"
            this.tabNavPreviewTitle = "btn-link"
        } else if(fieldName === "writeBody") {
            this.setState({...this.state, 
                writeBody: true
            })
            this.tabNavWriteBody = "btn-link navSelected"
            this.tabNavPreviewBody = "btn-link"
        } else if(fieldName === "previewTitle") {
            this.setState({...this.state, 
                writeTitle: false
            })
            this.tabNavWriteTitle = "btn-link"
            this.tabNavPreviewTitle = "btn-link navSelected"
        } else if(fieldName === "previewBody") {
            this.setState({...this.state, 
                writeBody: false
            })
            this.tabNavWriteBody = "btn-link"
            this.tabNavPreviewBody = "btn-link navSelected"
        }
    }

    goToPrevQuestion(e) {
        e.preventDefault();
        if(this.props.data.qno > 0) {
            this.props.change('q', this.props.data.sno, this.props.data.qno-1)
        }else if(this.props.data.sno > 0) {
            this.props.change('q', this.props.data.sno-1, this.props.quiz[this.props.data.sno-1].questions.length-1)
        }
        
    }

    goToNextQuestion(e) {
        e.preventDefault();
        if(this.props.data.qno+1 < this.props.quiz[this.props.data.sno].questions.length) {
            this.props.change('q', this.props.data.sno, this.props.data.qno+1)
        }else if(this.props.data.sno+1 < this.props.quiz.length) {
            this.props.change('q', this.props.data.sno+1, 0)
        }
    }

    render() {
        return (
            <div className="attempt-space">
                <div className="flex head-question-modal">
                    <button type="button" className="arena-slider" onClick={e => this.goToPrevQuestion(e)}>
                        <i className="fa fa-arrow-circle-o-left arrow arrow-items" aria-hidden="true"></i>
                    </button>
                    <div className="question-modal-heading">
                        <nav className="tabnav-with-question align-center"> 
                            <button type="button" className={this.tabNavWriteTitle + " write-tab"} onClick={(e) => this.handleClick("writeTitle", e)}>
                                Write
                            </button>
                            <button type="button" className={this.tabNavPreviewTitle + " preview-tab"} onClick={(e) => this.handleClick("previewTitle", e)}>
                                Preview
                            </button>
                        </nav>
                        <div className="center-text flex">
                            <div className="question-number inline">
                                Q{this.props.data.qno + 1}.
                            </div>
                            {  this.state.writeTitle ?
                                <textarea className="response-container response-textarea-with-question align-center" value={this.props.data.title} name="title" onChange={this.onChange}></textarea> 
                                : <MarkDown code={this.props.data.title}/>
                            }
                        </div>
                    </div>
                    <button type="button" className="arena-slider" onClick={e => this.goToNextQuestion(e)}>
                        <i className="fa fa-arrow-circle-o-right arrow arrow-items" aria-hidden="true"></i>
                    </button>
                </div>
                <div className="question-modal align-center">
                    <div className="question-modal-body">
                        <nav className="tabnav align-center"> 
                            <button type="button" className={this.tabNavWriteBody + " write-tab"} onClick={(e) => this.handleClick("writeBody", e)}>
                                Write
                            </button>
                            <button type="button" className={this.tabNavPreviewBody + " preview-tab"} onClick={(e) => this.handleClick("previewBody", e)}>
                                Preview
                            </button>
                        </nav>
                        <div className="qbody center-text">
                            { this.state.writeBody ?
                                <textarea className="response-container response-textarea align-center" value={this.props.data.body} name="body" onChange={this.onChange}></textarea> 
                                : <MarkDown code={this.props.data.body}/>
                            }
                        </div>
                        <div className="qbodySelect">
                            <KeyValInputRow title="isMCQ:" type="checkbox" checked={this.props.data.isMCQ} name="isMCQ" onChange={this.onChange} />
                            {this.props.data.isMCQ ? 
                                <Options data={this.props.data} key="0" onUpdate={this.props.onUpdate} /> : 
                                null
                            }
                        </div>
                        <div className="qbodySelect">
                            <KeyValInputRow title="autoCheck:" type="checkbox" checked={this.props.data.autocheck} name="autocheck" onChange={this.onChange} /> 
                            {this.props.data.autocheck ?
                                <KeyValInputRow title="answer:" type="text" name="answer" value={this.props.data.answer} onChange={this.onChange} /> 
                                : ""
                            }
                        </div>
                        <div className="qbodySelect">
                            <KeyValInputRow title="Marks:" type="text" name="marks" placeholder="Eg: 2" value={this.props.data.marks} onChange={this.onChange} /> 
                        </div>
                    </div>
                </div>
                <div className="response-buttons-container">
                    <div id="submission-status" className="flex center">
                    </div>
                    <div className="flex center">
                        {this.props.data.actionOnSubmit=="create" ?
                            <Btn className="submit-btn-create"
                                type="rounded"
                                html={this.props.data.actionOnSubmit}
                                onClick={this.props.submit}
                            /> : 
                            <Btn className="submit-btn"
                                type="rounded"
                                html={this.props.data.actionOnSubmit}
                                onClick={this.props.submit}
                            />
                        }
                        <Btn className="mark-btn"
                            type="rounded"
                            html="Delete"
                            onClick={this.props.delete}
                        />
                    </div>
                </div>
            </div>
        )
    }
}