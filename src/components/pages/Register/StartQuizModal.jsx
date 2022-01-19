import React, { useState } from 'react';
import TextField from '@components/Input/TextField';
import '@pagestyles/register/start_quiz_modal.scss';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';

const StartQuizModal = () => {
  const [accessCode, setAccessCode] = useState('');

	return (
    <div className="start-quiz">
        <div className="start-quiz-title">
            Start Quiz
            <CrossIcon />
        </div>
        <div className="start-quiz-container">
            <div className="start-quiz-container-text">
                Are you sure you want to start this quiz ?
            </div>
            <div className="start-quiz-access-code">
                <TextField
                  id="Access Code"
                  placeholder="Enter the quiz access code Eg: F4CSeb"
                  label="Access Code"
                  error=""
                  limit={15}
                  val={accessCode}
                  setVal={setAccessCode}
                />
            </div>
        </div>
        <div className="start-quiz-submit-container">
            <div className="start-quiz-button">
                <PrimaryCTA text="Start Quiz" onClick={()=>console.log('todo')} />
            </div>
        </div>
    </div>
	);
};

export default StartQuizModal;
