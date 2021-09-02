import React,  {Component} from 'react';
import '../../styles/modules/createdQuizTable.scss'
const config = require('../../config/config.json')

class CreatedQuizList extends Component
{
    adminPanelLink(){
        return config.baseURL + 'admin/' +  this.props.id
    }
    resultPaneLine(){
        return config.baseURL + 'results/' +  this.props.id
    }
    render(){
        return( 
            <div>
                <div className = "container-quiz">
                    <div className = "info-tab">   
                    <a href = {this.adminPanelLink()} className = "link-quiz">{this.props.name}</a>
                    </div>
                    <div className = "info-tab">   
                        {this.props.date}
                    </div>
                    <div className = "info-tab">   
                        {this.props.group ? this.props.group : 'Public' }
                    </div>
                    <div className = "info-tab">   
                        <a href = {this.resultPaneLine()} className = "link1">View Results</a>
                    </div>
                </div>
            </div>    
        )
    }
}
export default  CreatedQuizList