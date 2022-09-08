import React, { useEffect, useState } from 'react';
import TextField from '@components/Input/TextField';
import '@pagestyles/register/start_quiz_modal.scss';
import { useHistory } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import PropTypes from 'prop-types';
import { useGetQuiz } from '@api/quizzes/useQuizzes';

const StartQuizModal = ({ quizID, setShowModal }) => {
  const history = useHistory();
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [accessCodeError, setAccessCodeError] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const {
    data: quizData,
    isSuccess: quizDataSuccess,
    isLoading: quizDataLoading,
  } = useGetQuiz(quizID);

  const [isLoading, setLoading] = useState(false);
  useEffect(async () => {
    setShowAccessCode(false);
    console.log(quizData?.quiz);
    if (quizDataSuccess) {
      if (quizData?.quiz?.accessCode) {
        setAccessCode(quizData?.quiz?.accessCode);
        setShowAccessCode(true);
      }
    }
    setLoading(false);
  }, [quizDataSuccess, quizDataLoading]);

  const handleStartQuiz = () => {
    if (!showAccessCode) {
      history.push(`/quiz/attempt/${quizID}`);
    } else if (accessCodeInput === accessCode) {
      history.push(`/quiz/attempt/${quizID}`);
      setAccessCodeError(null);
    } else {
      console.log('wrong Access Code');
      setAccessCodeError('Invalid access code');
    }
  };

  return (
    <div className="start-quiz">
      {isLoading ? (
        <div>Fetching quiz</div>
      ) : (
        <>
          <div className="start-quiz-title">
            Start Quiz
            <CrossIcon className="cursor-pointer" onClick={() => { setShowModal(false); }} />
          </div>
          <div className="start-quiz-container">
            <div className="start-quiz-container-text">
              Are you sure you want to start this quiz ?
            </div>
            <div
              className={`start-quiz-access-code ${showAccessCode ? '' : 'hidden'
                }`}
            >
              <TextField
                id="Access Code"
                placeholder="Enter the quiz access code Eg: F4CSeb"
                label="Access Code"
                error={accessCodeError}
                helperText="Invalid access code"
                limit={15}
                val={accessCodeInput}
                setVal={setAccessCodeInput}
              />
            </div>
          </div>
          <div className="start-quiz-submit-container">
            <div className="start-quiz-button">
              <PrimaryCTA text="Start Quiz" onClick={handleStartQuiz} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

StartQuizModal.propTypes = {
  quizID: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default StartQuizModal;
