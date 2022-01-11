import React from 'react';
import '@pagestyles/create_quiz/quiz_details.scss';
import TextField from '@components/Input/TextField';

const QuizDetails = () => (
    <div className="quiz-details">
        <div className="quiz-details-title">Quiz Details</div>
        <div className="quiz-details-input">
            <TextField id="quiz name" placeholder="Enter quiz name" label="Quiz Name" error="" limit={20} />
        </div>
    </div>
);

export default QuizDetails;
