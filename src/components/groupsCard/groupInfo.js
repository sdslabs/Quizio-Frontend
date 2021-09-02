import React, { Component } from 'react'
import Btn from '../buttons/btn'
import GroupIcon from './groupIcon';
import Modal from '../popup/index'
import groupsAPI from '../../api/groups'

export default class GroupInfo extends Component {
    constructor(props){
        super(props)
        this.joined = false
        this.groupsAPI = new groupsAPI()
        this.openModal = this.openModal.bind(this)
        this.submitModal = this.submitModal.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.joinGroup = this.joinGroup.bind(this)
        this.leaveGroup = this.leaveGroup.bind(this)
        this.state = {
            joinGroupId : "",
            modalActive : 0,
            accessCode : "",
            leaveGroupId : "",
            left : false,
            joined : false,
            undo : false,
            errorModalActive : false,
            errorModalMsg : ""
        }
    }
    componentDidUpdate(prevProps){
        if(this.props.state != prevProps.state){
            this.setState({
                left : false,
                joined : false,
            })
        }
    }
    openModal(event){
        let groupId = event.target.parentElement.className;
        let undo = groupId.split(" ")[0] === "group-undo-container" ? 1 : 0
        groupId = groupId.substr(groupId.indexOf(' ')+1);
        if(this.props.state ^ undo){
            this.setState({
                modalActive : 2,
                leaveGroupId : groupId,
                undo : undo
            })
        }else{
            this.setState({
                modalActive : 1,
                joinGroupId : groupId,
                undo : undo
            })
    
        }
    }

    submitModal(event){
        let modalType = (event.target.innerHTML).split(" ")
        modalType = modalType[0] == "Join" ? 1 : 0 
        if(modalType){
            this.joinGroup(this.state.joinGroupId , this.accessCode)
        }else{
            this.leaveGroup(this.state.leaveGroupId)
        }

    }
    joinGroup(groupId , code){
        return this.groupsAPI.joinGroup(groupId , code).then((res)=>{
            if(res){
                let state_prop = this.state.undo === 0 ? 'joined' : 'left'
                let state_prop_val = this.state.undo === 0 ? true : false
                this.setState({
                    modalActive : 0,
                    [state_prop] : state_prop_val,
                    undo : 0
                })
 
            }else{
                this.setState({
                    modalActive : 0,
                    errorModalActive : true,
                    errorModalMsg : "Unable to join the group. Wrong Access Code. Please Try Again"
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    leaveGroup(groupId){
       return this.groupsAPI.leaveGroup(groupId).then((res)=>{
            if(res){
                let state_prop = this.state.undo === 0 ? 'left' : 'joined'
                let state_prop_val = this.state.undo === 0 ? true : false
                this.setState({
                    modalActive : 0,
                    [state_prop] : state_prop_val,
                    undo : 0
                })

            }else{
                this.setState({
                    modalActive : 0,
                    errorModalActive : true,
                    errorModalMsg : "Unable to leave the group.Please Try Again"
                })
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    handleModalClose(){
        this.setState({
            modalActive : 0,
            errorModalActive : false
        })
    }

    handleChange(event){
        this.accessCode = event.target.value
    }

    render() {
        let className = "group-info flex "
        if (this.props.className) {
            className += this.props.className
        } 
        let state = this.props.state
        let html = state == 0?"+" : " - "
        return (
            <div className={className}>
            <GroupIcon className='group-icon-info' width ='100' height='100'/>
                <div className="group-info-content">
                    <div className="group-info-heading">{this.props.name}</div>
                    <div className="group-info-sub-heading">{this.props.description}</div>
                </div>
                {   this.state.joined  == false && this.state.left == false &&
                    <div className = {"join-btn " + this.props.name}>
                        <Btn type = "round" html = {html} className={"group-add-btn "} onClick = {this.openModal}></Btn>
                    </div>
                }
                {   (this.state.joined || this.state.left)&&
                    <div className = {'group-undo-container ' + this.props.name} id = "group-undo">
                        <div className = "group-temporary-status">{this.state.joined ? "Added" : "Removed"}</div>
                        <button className = "group-undo-btn" onClick = {this.openModal}>Undo</button>
                    </div>
                }
                {(this.state.modalActive > 0) && 
                <Modal modalDialogue='modalDialogue-enterQuiz'>
                        <Btn onClick={this.handleModalClose} className="btn-popup" html='.' />
                        <div className="quiz-code">
                            {(this.state.modalActive == 1) && <span className="code-text">Enter the code to join the group</span>}
                            {(this.state.modalActive == 1) && <span><input type="text" id="code-input" name="quizCode" placeholder="Eg: A3412 // leave empty incase of no-code" onChange={this.handleChange} /></span>}
                            <span><Btn className="enter-quiz" html={(this.state.modalActive > 1) ? "Leave Group" : "Join Group"} onClick={this.submitModal} /></span>
                        </div>
                </Modal>
                }
                {
                    this.state.errorModalActive &&
                    <Modal modalDialogue='modalDialogue-enterQuiz'>
                        <Btn onClick={this.handleModalClose} className="btn-popup" html='.' />
                        <div className = "alert-signup-popup"> {this.state.errorModalMsg}</div>
                    </Modal>
                }
            </div>
            
        )
    }
}