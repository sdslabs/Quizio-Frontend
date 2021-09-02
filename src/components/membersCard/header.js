import React, { Component } from 'react'
import Btn from '../buttons/btn'
import Modal from '../popup/index'
import groupsAPI from '../../api/groups'

export default class Header extends Component {
    constructor(props){
        super(props)
        this.state = {
            modalActive : false,
            joinMemberId : ""
        }
        this.groupsAPI = new groupsAPI()
        this.activateModal = this.activateModal.bind(this)
        this.addMembers = this.addMembers.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
    }
    activateModal(){
        this.setState({
            modalActive : true
        })        
    }

    addMembers(){
        let addMembers = this.state.joinMemberId
        this.groupsAPI.updateGroup(this.props.groupId , {addMembers : addMembers }).then(res =>{
            if(res.success && res.status){
                this.setState({
                    modalActive : false,
                })
                window.location.reload()
            }else{
                this.setState({
                    modalError : "Unable to add the member"
                })
            }
        }).catch(error =>{
            console.log(error)
        })
    }

    handleChange(event){
        this.setState({
            joinMemberId : event.target.value 
        })
    }

    handleModalClose(){
        this.setState({
            modelActive : false
        })
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
                    <div className = "members-card-header-title"> {"Group Members " + "(" 
                        + this.props.numMembers + ")" }</div>
                </div>
                <div className = "create-group-btn-container">
                    <div className = "create-group-label">Add Members</div>
                    <div className="group-card-btn">
                            <Btn type="round"
                            className="create-group-btn"
                            html="+"
                            onClick = {this.activateModal} />
                    </div>
                </div>
                {
                    this.state.modalActive && 
                        <Modal modalDialogue='modalDialogue-enterQuiz'>
                        <Btn onClick={this.handleModalClose} className="btn-popup" html='.' />
                        <div className="quiz-code">
                            <span className="code-text">Enter the username of the member</span>
                            <span><input type="text" id="code-input" name="quizCode" placeholder="Enter username of the member eg: user@gmail.com" onChange={this.handleChange} /></span>
                            <span><Btn className="enter-quiz" html="Add Member" onClick={this.addMembers} /></span>
                        </div>
                    </Modal>
                }
            </div>
        )
    }
}