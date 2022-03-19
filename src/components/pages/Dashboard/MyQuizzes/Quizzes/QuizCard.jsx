import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as QuizName } from '@icons/quizname.svg';
import { truncateQuizName } from '@utils/truncate';
import { getDateTime } from '@utils/date';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import '@pagestyles/dashboard/quiz_card.scss';
import {
  useCheckIfUserIsRegisteredForQuiz,
  useRegisterParticipant,
} from '@api/register/useRegister';
import log from '@utils/log';
import { useHistory } from 'react-router-dom';

const QuizCard = ({ data }) => {
  const history = useHistory();
  const [registered, setRegistered] = useState(false);

  const {
    mutate,
    isLoading,
    isSuccess: RegisterSuccess,
    isError,
    error,
  } = useRegisterParticipant();

  const {
    data: isRegisteredData,
    isLoading: isRegistrationLoading,
    isSuccess: isRegisterCheckSuccess,
  } = useCheckIfUserIsRegisteredForQuiz(data.quizioID);

  const handleRegister = () => {
    const body = {
      quizID: data.quizioID,
    };
    mutate({ body });
  };

  const handleStart = () => {
    history.push(`/quiz/attempt/${data.quizioID}`);
  };

  useEffect(() => {
    log({ RegisterSuccess });
    if (RegisterSuccess) {
      setRegistered(true);
    }
  }, [RegisterSuccess]);

  useEffect(() => {
    if (isError) {
      log({ error: error.response.data.errors[0] });
    }
  }, [isError]);

  useEffect(() => {
    if (isRegisterCheckSuccess) {
      log({
        quiz: data.name,
        isRegistered: isRegisteredData?.data?.data?.registered,
      });
      setRegistered(isRegisteredData?.data?.data?.registered);
    }
  }, [isRegisterCheckSuccess]);

  return (
      <div className="quiz-card">
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
                  <div className="register-button">
                      {isRegistrationLoading ? (
                          <div>Loading registration info...</div>
            ) : (
                <>
                    {registered ? (
                        <PrimaryCTA text="Start Quiz" onClick={handleStart} />
                ) : (
                    <PrimaryCTA
                      text={isLoading ? 'Registering' : 'Register'}
                      onClick={handleRegister}
                      disabled={RegisterSuccess}
                    />
                )}
                </>
            )}
                  </div>
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
