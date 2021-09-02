import React, { Component } from 'react'
import GroupInfo from './groupInfo'
import NoQuizzes from '../noQuizzes'
import '../../styles/modules/groupsCard.scss'
import HomeCard from './homeCard'
import Btn from '../buttons/btn'

export default class GroupsCard extends Component {
    createQuiz(){
        window.location = "/createQuiz";
    }
    render() {
        let groups = this.props.groups
        let home = this.props.home
        if(home) {
            return (
                <div className='flex column groupsContainer'>
                    <div className = "create-quiz-btn-container">
                        <Btn className="submit-btn-create-quiz"
                                type="rounded"
                                html="Create Quiz"
                                onClick={this.createQuiz}
                        />
                    </div>
                    <div className='group-card-home-title-container'><div className='group-card-home-title'>Your Groups</div></div>
                    {Array.isArray(groups[0]) && groups[0].length ?
                        <HomeCard groups={groups}/> :
                        <NoQuizzes showImg={false} section='You Are Not In Any Groups'/>}
                </div>
            )
        }
        return (
            <div className="groupsCard flex wrap">
            {   
                groups.map((group, index) => {
                    let className = ''
                    if (groups.length > 1 && groups.length%2 && index === groups.length-1) {
                        className += 'unpaired-flex-item'
                    }
                    return (
                        <GroupInfo
                            name={group.groupId}
                            description={group.description}
                            status="Join group"
                            key={index}
                            className={className}
                            state={this.props.state}
                        />
                    )
                })
            }
            </div>
        )    
    }
}