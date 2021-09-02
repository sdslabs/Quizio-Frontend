import React,  {Component} from 'react';
import '../../styles/modules/groupNameBoard.scss'
import GroupName from '../groupName';
class GroupNameBoard extends Component
{
    render(){
        return( 
            <div>
                <div className = "your-grp">
                    Your Groups
                </div>
                <div className = "no-groups-placeholder-container">
                    <div className = "no-groups-placeholder">You are not in any groups</div>
                </div>
                {   this.props.groups && this.props.groups.map((group) => {
                        return (
                            <GroupName name = {group.groupId} />
                        )
                    })
                }
            </div>
        )
    }
}

export default  GroupNameBoard