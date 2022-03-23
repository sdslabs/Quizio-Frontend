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
import ModalWrapper from '@components/Modals/ModalWrapper';
import dayjs from 'dayjs';
import UserQuizRegistration from './Modals/QuizRegistrationModal';
import StartQuizModal from './Modals/StartQuizModal';

const QuizCard = ({ data }) => {
  const [registered, setRegistered] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showStartModal, setshowStartModal] = useState(false);

  const {
    isLoading,
    isSuccess: RegisterSuccess,
    isError,
    error,
    mutate: mutateRegisterParticipant,
    data: RegisterData,
  } = useRegisterParticipant();

  const {
    data: isRegisteredData,
    isLoading: isRegistrationLoading,
    isSuccess: isRegisterCheckSuccess,
  } = useCheckIfUserIsRegisteredForQuiz(data.quizioID);

  const handleRegister = () => {
    setShowRegisterModal(true);
  };

  const handleStart = () => {
    setshowStartModal(true);
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
      log(
        {
          quiz: data.name,
          isRegistered: isRegisteredData?.data?.data?.registered,
        },
        false,
      );

      setRegistered(isRegisteredData?.data?.data?.registered);
    }
  }, [isRegisterCheckSuccess]);

  useEffect(() => {
    if (RegisterSuccess) {
      log('registered!', { RegisterData });
      setShowRegisterModal(false);
    }
  }, [RegisterSuccess, RegisterData]);

  return (
      <div className="quiz-card">
          {data && showRegisterModal && (
          <ModalWrapper
            setShowModal={setShowRegisterModal}
            showModal={showRegisterModal}
          >
              <UserQuizRegistration
                quizID={data.quizioID || ''}
                setShowModal={setShowRegisterModal}
                mutateRegisterParticipant={mutateRegisterParticipant}
              />
          </ModalWrapper>
      )}
          {data && showStartModal && (
          <ModalWrapper
            setShowModal={setshowStartModal}
            showModal={showStartModal}
          >
              <StartQuizModal quizID={data.quizioID || ''} setShowModal={setshowStartModal} />
          </ModalWrapper>
      )}

          <div className="banner-container">
              <QuizName />
              <h3 className="name">
                  {data.name ? truncateQuizName(data.name) : 'Quiz Name'}
              </h3>
          </div>
          <div className="quiz-details">
              <div className="quiz-title">{data.name ? data.name : 'Quiz Name'}</div>
              <div className="quiz-desc truncate">
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
                        <>
                            {dayjs(data.startTime) > dayjs() ? (
                                <div className="registered">Registered</div>
                    ) : (
                        <PrimaryCTA text="Start Quiz" onClick={handleStart} />
                    )}
                        </>
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
