import React from 'react';
import '../../styles/modules/createdQuizTable.scss'
import CreatedQuizList from '../createdQuizList';

const CreatedQuizTable = (props) => {

    // should be a util function
    const formatDate = (date) => {
        var d = new Date(date);
        return d.toLocaleDateString('en-GB');
    }

    return (
        <>
            <div className="title-container">
                <div className="container-title">Created Quizes</div>
            </div>

            {props.data && props.data.map((quiz) => (
                <CreatedQuizList name={quiz.title} date={formatDate(quiz.startTime)} id={quiz._id} />
            ))}

            {!props.data &&
                <div className='empty-quiz-placeholder-container'>
                    <div className='empty-quiz-placeholder'> No Created Quizzes</div>
                </div>
            }
        </>
    )
}
export default CreatedQuizTable