import React, { useEffect, useState } from 'react';
import TextField from '@components/Input/TextField';
import '@pagestyles/register/start_quiz_modal.scss';
import { useHistory } from 'react-router-dom';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import PropTypes from 'prop-types';
import { useGetQuiz } from '@api/quizzes/useQuizzes';
import { useCheckAccessCode } from '@api/register/useRegister';

const StartQuizModal = ({ quizID, setShowModal }) => {
  const history = useHistory();
  const [showAccessCode, setShowAccessCode] = useState(false);
  const [accessCodeInput, setAccessCodeInput] = useState('quizio');
  const [accessCodeError, setAccessCodeError] = useState('');

  // apis
  const {
    data: quizData,
    isSuccess: quizDataSuccess,
    isLoading: quizDataLoading,
  } = useGetQuiz(quizID);

  const {
    data: accessCodeData,
    isSuccess: accessCodeDataSuccess,
    refetch,
  } = useCheckAccessCode(quizID, accessCodeInput, { cacheTime: 0, staleTime: 0, refetchInterval: 0 });
  const [isLoading, setLoading] = useState(false);

  useEffect(async () => {
    setShowAccessCode(false);
    console.log(quizData?.quiz);
    if (quizDataSuccess) {
      if (quizData?.quiz?.accessCode !== 'quizio') {
        setShowAccessCode(true);
      }
    }
    setLoading(false);
  }, [quizDataSuccess, quizDataLoading]);

  const handleStartQuiz = () => {
    if (!showAccessCode) {
      history.push(`/quiz/attempt/${quizID}/quizio`); // kya usko as a variable daalna padega?
    } else {
      console.log('in else');
      refetch({ quizID, accessCodeInput });
      console.log('after refetch');
      if (accessCodeDataSuccess) {
        console.log(accessCodeData.data.data.correct);
        if (accessCodeData.data.data.correct) {
          setAccessCodeError(null);
          history.push(`/quiz/attempt/${quizID}/${accessCodeInput}`);
        } else {
          setAccessCodeError('Invalid access code');
        }
      }
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
