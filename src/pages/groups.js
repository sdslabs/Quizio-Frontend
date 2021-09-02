import React, { Component } from 'react'
import Header from '../components/header'
import groupsAPI from '../api/groups'
import GroupsCard from '../components/groupsCard'
import GroupsCardHeader from '../components/groupsCard/header'

class Groups extends Component {
    constructor(props) {
        super(props)
        this.state = {
            state: 0,
            groups: []
        }
        this.toggleState = this.toggleState.bind(this)
        this.groupsAPI = new groupsAPI()
    }

    componentDidMount() {
        this.fetchData()   
    }
    
    toggleState() {
        this.fetchData(1)
    }

    fetchData(toggle = 0) {
        if (this.state.state ^ toggle) {
            this.groupsAPI.fetchGroupsForUser().then((userGroups)=>{
                this.setState((state) => {
                    return {
                        state: state.state ^ toggle,
                        groups: userGroups
                    }
                })
            }).catch((err)=>{
                console.log(err)
            })
        } else {
            this.groupsAPI.fetchGroups().then((groupData)=>{
                this.groupsAPI.fetchGroupsForUser().then((userGroups)=>{

                    this.setState((state) => {
                        return {
                            state: state.state ^ toggle,
                            groups: groupData.filter(({ _id: id1 }) => !userGroups.some(({ _id: id2 }) => id2 === id1))
                        }
                    })
                })
            }).catch((err)=>{
                console.log(err)
            })
        }
    }

    join(groupId){
        
    }
    render() {
        return (
            <div>
                <Header logo />
                <GroupsCardHeader toggleState={this.toggleState} state={this.state.state}/>
                <GroupsCard groups={this.state.groups} state = {this.state.state} />
            </div>

        )
    }
}

export default Groups
