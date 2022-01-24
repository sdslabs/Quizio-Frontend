import React from 'react';
import UserQuizRegistration from './UserQuizRegistration';
import StartQuiz from './StartQuizModal';

const index = () => (
    <div>
        Register!!!
        <StartQuiz showAccessCode={false} />
        <UserQuizRegistration />
    </div>
	);

export default index;
