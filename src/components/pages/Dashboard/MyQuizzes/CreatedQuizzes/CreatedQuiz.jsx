import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { ReactComponent as QuizName } from '@icons/quizname.svg';
import { truncateQuizName } from '@utils/truncate';
import { getDateTime } from '@utils/date';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import { useHistory } from 'react-router-dom';
import '@pagestyles/dashboard/created_quizzes.scss';

const CreatedQuiz = ({ data }) => {
  const history = useHistory();
  const [isUpcoming, setIsUpcoming] = useState(true);

  const handleEdit = () => history.push(`/quiz/edit/${data.quizioID}`);
  const handleCheck = () => history.push(`/quiz/check/${data.quizioID}`);

  useEffect(() => {
    const start = dayjs(data.startTime);
    setIsUpcoming(start.isAfter(dayjs()));
  }, [data]);

  return (
      <div className="created-quiz">
          <div className="banner-container">
              <QuizName />
              <h3 className="name">
                  {data.name ? truncateQuizName(data.name) : 'Quiz Name'}
              </h3>
          </div>
          <div className="quiz-details">
              <div className="quiz-title">{data.name ? data.name : 'Quiz Name'}</div>
              <div className="quiz-desc">
                  {data.description ? data.description : 'Quiz Description'}
              </div>
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
                  {isUpcoming || !data.startTime ? (
                      <PrimaryCTA text="Edit" onClick={handleEdit} />
              ) : (
                  <PrimaryCTA text="Check" onClick={handleCheck} />
              )}
              </div>
          )}
              </div>
          </div>
      </div>
  );
};
CreatedQuiz.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired,
};

export default CreatedQuiz;
