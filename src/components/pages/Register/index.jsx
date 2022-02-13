import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UserQuizRegistration from './UserQuizRegistration';
import StartQuiz from './StartQuizModal';

const index = () => {
    const { quizID } = useParams();
    useEffect(() => {
        console.log({ quizID });
    }, [quizID]);
    return (
        <div>
            Register!!!
            <StartQuiz quizID={quizID} />
            <UserQuizRegistration quizID={quizID} />
        </div>
	);
};
export default index;
