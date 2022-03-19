import React, { useState, useEffect } from 'react';
// import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import PropTypes from 'prop-types';
import { ReactComponent as QuizName } from '@icons/quizname.svg';
import { truncateQuizName } from '@utils/truncate';
import { getDateTime } from '@utils/date';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import '@pagestyles/dashboard/quiz_card.scss';
import ModalWrapper from '@components/Modals/ModalWrapper';
import UserQuizRegistrationModal from '@components/Modals/UserQuizRegistrationModal';
// import { useHistory } from 'react-router';

const QuizCard = ({ quizData, updateCallback }) => {
const [showModal, setShowModal] = useState(false);
const [data, setData] = useState({});
  const handleRegister = () => {
  setShowModal(true);
};
useEffect(() => {
    setData(quizData);
  }, []);
useEffect(() => {
    setData(quizData);
  }, [quizData]);

const updateQuiz = async () => {
    console.log('callback caller=d');
    updateCallback();
};
  return (
      <div className="quiz-card">
          <div className="banner-container">
              <QuizName />
              <h3 className="name">{data.name ? truncateQuizName(data.name) : 'Quiz Name'}</h3>
          </div>
          <div className="quiz-details">
              <div className="quiz-title">{data.name ? data.name : 'Quiz Name'}</div>
              <div className="quiz-desc">{data.description ? data.description : 'Quiz Description'}</div>
              <div className="quiz-startTime">
                  <div className="scheduled">Scheduled:</div>
                  <div className="time">
                      {data.startTime
              ? getDateTime(data.startTime)
              : 'Not yet scheduled!'}
                  </div>
              </div>
              <div className="register-container">
                  {data.registered ? (
                      <div className="registered">Registered</div>
          ) : (
              <div className="register-button">
                  <PrimaryCTA text="Register" onClick={handleRegister} />
              </div>
          )}
              </div>
          </div>
          <ModalWrapper
            showModal={showModal}
            setShowModal={setShowModal}
            hideOnOverlayClick
            maxWidth="md"
          >
              <UserQuizRegistrationModal
                quizID={data.quizioID}
                detail1={data.detail1}
                detail2={data.detail2}
                detail3={data.detail3}
                setShowModal={setShowModal}
                updateCallback={updateQuiz}
              />
          </ModalWrapper>
      </div>
  );
};
QuizCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  quizData: PropTypes.any.isRequired,
  updateCallback: PropTypes.func.isRequired,
};

export default QuizCard;
