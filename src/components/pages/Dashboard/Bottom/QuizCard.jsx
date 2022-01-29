import React from 'react';
// import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import PropTypes from 'prop-types';
import { ReactComponent as QuizName } from '@icons/quizname.svg';
import { truncateQuizName } from '@utils/truncate';
import '@pagestyles/dashboard/quizzes.scss';
import { getDateTime } from '@utils/date';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';

const QuizCard = ({ data }) => {
  const handleRegister = () => {};

  return (
      <div className="quiz-card">
          <div className="banner-container">
              <QuizName />
              <h3 className="name">{truncateQuizName(data.name)}</h3>
          </div>
          <div className="quiz-details">
              <div className="quiz-title">{data.name}</div>
              <div className="quiz-desc">{data.name}</div>
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
      </div>
  );
};
QuizCard.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired,
};

export default QuizCard;
