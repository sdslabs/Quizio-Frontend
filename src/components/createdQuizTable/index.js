import React,  {Component} from 'react';
import '../../styles/modules/createdQuizTable.scss'
import CreatedQuizList from '../createdQuizList';
import Quizzes from '../../api/quizzes';

class CreatedQuizTable extends Component
{   
    formatDate = (date) => {
        var d = new Date(date);
        return d.toLocaleDateString('en-GB');
    }

    render(){
        console.log(this.props.data)
        return( 
            <div>
                <div className = "title-container">
                    <div className = "container-title">Created Quizes</div>

                </div>
                {   this.props.data && this.props.data.map((quiz) => {
                        return (
                            <CreatedQuizList name = {quiz.title} date = {this.formatDate(quiz.startTime)} id = {quiz._id} />
                            )
                        })    
                }
                {
                    !this.props.data && 
                    <div className = 'empty-quiz-placeholder-container'>
                        <div className = 'empty-quiz-placeholder'> No Created Quizzes</div>
                    </div>
                }
            </div>    
        )
    }
}
export default  CreatedQuizTable