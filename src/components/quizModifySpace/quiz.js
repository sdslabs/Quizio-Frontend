import React, { Component } from 'react'
import Btn from '../buttons/btn'
import '../../styles/modules/quizAttemptSpace.scss'
import MarkDown from '../../parser/markdown'
import KeyValInputRow from '../keyValInputRow'
import DateTimeInput from '../dateTimeInput'
import moment from 'moment'

export default class QuizEditor extends Component {

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
    }

    onChange = (event) => {
        const target = event.target
        let upd = {};
        upd[target.name] = target.value;
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, upd)
    }

    onChangeStart = (value) => {
        let upd = {};
        upd['startTime'] = value;
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, upd)
    }

    onChangeEnd = (value) => {
        let upd = {};
        upd['endTime'] = value;
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, upd)
    }

    onOwnerChange = (event) => {
        const target = event.target
        let value = target.value
        let newOwners = this.props.data.owners  
        newOwners = newOwners.map((Owner) => {
            if(Owner.id == target.name){
                Owner.val = value
            }
            return Owner
        })
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, {owners: newOwners})
    }

    onOwnerDelete = (event) => {
        const target = event.target
        let newOwners = this.props.data.owners.filter((owner) => owner.id != target.name)
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, {owners: newOwners})
    }

    onOwnerAdd = (event) => {
        let newOwners = this.props.data.owners
        let lastId
        if(newOwners.length === 0){
            newOwners.push({
                id: 0,
                val: ""
            })
        }
        else{
            lastId = newOwners[newOwners.length-1].id
            newOwners.push({
                id: lastId+1,
                val: ""
            })
        }
        this.props.onUpdate(this.props.data.sno, this.props.data.qno, {owners: newOwners})
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

    render() {
        return (
            <div className="section-modal align-center">
                <KeyValInputRow title="Title:" type="text" name="title" placeholder="Quiz-Title" value={this.props.data.title} onChange={this.onChange} /> 
                <div className = "flex row formRow">
                    <div className = "inputTitleContainer">
                        <div className = "inputTitle">Start Time:</div>
                    </div>
                    <DateTimeInput onChange={this.onChangeStart} initValue={this.props.data.startTime || moment()}/>
                </div>
                <div className = "flex row formRow">
                    <div className = "inputTitleContainer">
                        <div className = "inputTitle">End Time:</div>
                    </div>
                    <DateTimeInput onChange={this.onChangeEnd} initValue={this.props.data.endTime || moment()}/>
                </div>

                <KeyValInputRow title="Owners:" type="text" name="ownerSize" value={this.props.data.owners.length} onChange={this.onChange} readonly={true} /> 
                {this.props.data.owners.map(owner => {
                    return (          
                        <div key={owner.id} className="flex qoption">
                            <div className = "inputTitleContainer">
                                <div className = "inputTitle">
                                    <Btn className="question-btn"
                                        type="round"
                                        html="-"
                                        onClick={this.onOwnerDelete}
                                        name={owner.id}
                                    />
                                </div>
                            </div>
                            <input className = "inputBox" type="text" value={owner.val} name={owner.id} placeholder="Owner" onChange={this.onOwnerChange} />
                        </div>
                    )
                })}
                {/* <div>
                    <button className="question-btn" onClick={this.onOwnerAdd} >+</button>
                </div> */}
                <div className = "inputTitleContainer">
                    <div className = "inputTitle">
                        <Btn className="question-btn"
                            type="round"
                            html="+"
                            onClick={this.onOwnerAdd}
                        />
                    </div>
                </div>

                <div className="question-modal-body">
                    <nav className="tabnav align-center"> 
                        <button type="button" className={this.tabNavWriteTitle + " write-tab"} onClick={(e) => this.handleClick("writeTitle", e)}>
                            Write
                        </button>
                        <button type="button" className={this.tabNavPreviewTitle + " preview-tab"} onClick={(e) => this.handleClick("previewTitle", e)}>
                            Preview
                        </button>
                    </nav>
                    <div className="center-text flex">
                        {  this.state.writeTitle ?
                            <textarea className="response-container response-textarea align-center" value={this.props.data.description} placeholder = "Description" name="description" onChange={this.onChange}></textarea> 
                            : <MarkDown code={this.props.data.description}/>
                        }
                    </div>
                </div>

                <div className="question-modal-body">
                    <nav className="tabnav align-center"> 
                        <button type="button" className={this.tabNavWriteBody + " write-tab"} onClick={(e) => this.handleClick("writeBody", e)}>
                            Write
                        </button>
                        <button type="button" className={this.tabNavPreviewBody + " preview-tab"} onClick={(e) => this.handleClick("previewBody", e)}>
                            Preview
                        </button>
                    </nav>
                    <div className="flex center-text">
                        { this.state.writeBody ?
                            <textarea className="response-container response-textarea align-center" value={this.props.data.instructions} placeholder = "Instructions"  name="instructions" onChange={this.onChange}></textarea> 
                            : <MarkDown code={this.props.data.instructions}/>
                        }
                    </div>
                </div>

                <KeyValInputRow title="Access-code:" type="text" name="accessCode" placeholder="access-code" value={this.props.data.accessCode} onChange={this.onChange} /> 
                {/* <KeyValInputRow title="Public:" type="checkbox" name="public" value={this.props.data.public} onChange={this.onChange} />  */}
            </div>
        )
    }
}