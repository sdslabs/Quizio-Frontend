import React, { Component } from 'react'
import Header from '../components/header'
import groupsAPI from '../api/groups'
import MembersCard from '../components/membersCard'
import MembersCardHeader from '../components/membersCard/header'


class Members extends Component {
    constructor(props) {
        super(props)
        this.state = {
            groupId : this.props.match.params.groupId,
            members : [],
            admins : []
        }
        this.groupsAPI = new groupsAPI()
    }

    componentDidMount() {
        console.log(this.state.members[0])
        this.getMembers()
        this.setState({
            groupId : this.props.match.params.groupId,
        })

    }
    
    getMembers(){
        this.groupsAPI.fetchGroupMembers(this.state.groupId).then(res=>{
 
            this.setState({
                members :  res.groupMembers.members,
                admins : res.groupMembers.admins
            })
        })

    }

    render() {
        return (
            <div>
                <Header logo />
                <MembersCardHeader numMembers = {(this.state.members).length} groupId = {this.state.groupId}/>
                <MembersCard members = {this.state.members} groupId = {this.state.groupId} admins = {this.state.admins} />
            </div>

        )
    }
}

export default Members