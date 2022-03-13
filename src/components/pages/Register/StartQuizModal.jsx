import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@components/Input/TextField';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { ReactComponent as CrossIcon } from '@icons/cross.svg';
import '@pagestyles/register/start_quiz_modal.scss';
import log from '@utils/log';

const StartQuizModal = ({ showAccessCode, setShowModal }) => {
  const [accessCode, setAccessCode] = useState('');
  const handleCloseModal = () => setShowModal(false);

  return (
      <div className="start-quiz">
          <div className="start-quiz-title">
              Start Quiz
              <button type="button" onClick={handleCloseModal}>
                  <CrossIcon />
              </button>
          </div>
          <div className="start-quiz-container">
              <div className="start-quiz-container-text">
                  Are you sure you want to start this quiz ?
              </div>
              <div
                className={`start-quiz-access-code ${showAccessCode ? '' : 'hidden'}`}
              >
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
                  <PrimaryCTA text="Start Quiz" onClick={() => log('todo')} />
              </div>
          </div>
      </div>
  );
};

StartQuizModal.propTypes = {
  showAccessCode: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
};

export default StartQuizModal;
