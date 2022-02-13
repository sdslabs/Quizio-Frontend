import React, { useEffect, useState } from 'react';
import TextField from '@components/Input/TextField';
import '@pagestyles/register/start_quiz_modal.scss';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import PropTypes from 'prop-types';
import { getQuizById } from '@api/quizzes/quizzesFetcher';

const StartQuizModal = ({ quizID }) => {
  const [showAccessCode, setShowAccessCode] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [accessCodeInput, setAccessCodeInput] = useState('');
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const res = await getQuizById({ quizId: quizID });
    console.log(res);
    if (res.success) {
      setQuiz(res.data.quiz);
      if (quiz.accessCode) {
        setAccessCode(quiz.accessCode);
        setShowAccessCode(true);
      }
    }

    setLoading(false);
  }, []);
  const handleStartQuiz = () => {
    if (showAccessCode) {
      if (accessCodeInput === accessCode) {
        console.log('start with access code');
      } else {
          console.log('wrong Access Code');
      }
    } else { console.log('start without access code'); }
  };
console.log(showAccessCode);

	return (
    <div className="start-quiz">
        {loading ? (
            <div>Fetching quiz</div>
      ) : (
          <>
              <div className="start-quiz-title">
                  Start Quiz
                  <CrossIcon />
              </div>
              <div className="start-quiz-container">
                  <div className="start-quiz-container-text">
                      Are you sure you want to start this quiz ?
                  </div>
                  <div className={`start-quiz-access-code ${showAccessCode ? '' : 'hidden'}`}>
                      <TextField
                        id="Access Code"
                        placeholder="Enter the quiz access code Eg: F4CSeb"
                        label="Access Code"
                        error=""
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
 // showAccessCode: PropTypes.bool.isRequired,
    quizID: PropTypes.string.isRequired,
};

export default StartQuizModal;
