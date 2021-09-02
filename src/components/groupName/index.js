import React,  {Component} from 'react';
import '../../styles/modules/groupName.scss';
class GroupName extends Component
{
    render(){
        return( 
            <div className = "group-container">
                <div className = "icon">  G </div>
                <div className = "group-name"> {this.props.name}</div>
            </div>
        )
     }
    }

export default  GroupName