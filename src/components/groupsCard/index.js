import React from 'react'
import { useHistory } from 'react-router'
import GroupInfo from './groupInfo'
import NoQuizzes from '../noQuizzes'
import HomeCard from './homeCard'
import Btn from '../buttons/btn'
import '../../styles/modules/groupsCard.scss'

const GroupsCard = (props) => {
    let history = useHistory()
    let home = props.home
    let groups = props.groups


    const createQuiz = () => {
        history.push('/createQuiz')
    }

    return (
        <>
            {home ? (
                <div className='flex column groupsContainer' >
                    <div className="create-quiz-btn-container">
                        <Btn className="submit-btn-create-quiz"
                            type="rounded"
                            html="Create Quiz"
                            onClick={createQuiz}
                        />
                    </div>
                    <div className='group-card-home-title-container'>
                        <div className='group-card-home-title'>Your Groups</div>
                    </div>
                    {groups && groups.length ?
                        <HomeCard groups={groups} /> :
                        <NoQuizzes showImg={false} section='You Are Not In Any Groups' />
                    }
                </div >) : (
                <div className="groupsCard flex wrap">
                    {
                        groups.map((group, index) => {
                            let className = ''
                            if (groups.length > 1 && groups.length % 2 && index === groups.length - 1) {
                                className += 'unpaired-flex-item'
                            }
                            return (
                                <GroupInfo
                                    name={group.groupId}
                                    description={group.description}
                                    status="Join group"
                                    key={index}
                                    className={className}
                                    state={props.state}
                                />
                            )
                        })
                    }
                </div>
            )}
        </>
    )

}

export default GroupsCard