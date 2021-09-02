import React,  {Component} from 'react';
import '../../styles/modules/userDashboard.scss'
    
class UserDashboard extends Component
{
    render(){
        return( <div className = "container">

            
                <div className = "img-container">
                    <div className = "profile-pic"> 
                        {(this.props.name[0]).toUpperCase()}
                    </div>
                </div>
                <div className = "info-box">
                    <div className = "name-box">
                    {this.props.name}
                    </div>

                    <div className = "bio-box">
                    {this.props.bio}
                    </div>
                </div>
                <div className = "stat-container">
                    <div className = "stat-box">
                        <div className = "stat-name">
                            Created Quizes
                         </div>
                         <div className = "stat-1"> 
                            {this.props.lenCreatedQuizzes ? Object.keys(this.props.lenCreatedQuizzes).length : 0 }
                        </div>
                         
                    </div>
                    <div className = "stat-box">
                        <div className = "stat-name">
                            Paricipated Quizes
                        </div>
                        <div className = "stat-2"> 
                            {this.props.lenRegisteredQuizzes ? Object.keys(this.props.lenRegisteredQuizzes).length : 0 }
                        </div>
                    </div>
                  
                    <div className = "stat-box" id = "sb1">
                        <div className = "stat-name">
                            Groups  
                        </div>
                        <div className = "stat-3"> 
                            {this.props.lenGroups ? Object.keys(this.props.lenGroups).length : 0 }
                        </div>
                    </div>
                </div>
         </div>       
        )
    }
}

export default  UserDashboard