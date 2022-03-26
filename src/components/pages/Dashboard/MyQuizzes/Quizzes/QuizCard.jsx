import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { ReactComponent as QuizName } from '@icons/quizname.svg';
import { truncateQuizName } from '@utils/truncate';
import { getDateTime } from '@utils/date';
import PrimaryCTA from '@components/Buttons/PrimaryCTA';
import '@pagestyles/dashboard/quiz_card.scss';
import { useRegisterParticipant } from '@api/register/useRegister';
import log from '@utils/log';
import ModalWrapper from '@components/Modals/ModalWrapper';
import dayjs from 'dayjs';
import { ToastContainer, toast } from 'react-toastify';
import { useGetCurrentServerTime } from '@api/misc/useTime';
import UserQuizRegistration from './Modals/QuizRegistrationModal';
import StartQuizModal from './Modals/StartQuizModal';
import 'react-toastify/dist/ReactToastify.css';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
const QuizCard = ({ data }) => {
  const query = useQuery();
  const [registered, setRegistered] = useState(false);
  const [submitted, setSubmitted] = useState(true);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showStartModal, setshowStartModal] = useState(false);
  const [serverTime, setServerTime] = useState(dayjs());

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

  const {
    data: isSubmittedData,
    isLoading: isSubmittedLoading,
    isSuccess: isSubmittedCheckSuccess,
  } = useCheckIfQuizIsSubmitted(data.quizioID);

  const {
    data: serverTimeData,
    isSuccess: isServerTimeSuccess,
  } = useGetCurrentServerTime();

  const handleRegister = () => setShowRegisterModal(true);

  const handleStart = () => {
    if (!submitted) {
      if (data.quizioID !== query.get('submitted')) {
        setshowStartModal(true);
      }
    }
  };

  useEffect(() => {
    log({ RegisterSuccess }, false, false);
    if (RegisterSuccess) {
      setRegistered(true);
      toast.success('User registered successfully!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [RegisterSuccess]);

  useEffect(() => {
    if (isError) {
      log({ error: error.response.data.errors[0] }, false, false);
    }
  }, [isError]);

  useEffect(() => {
    // Set submitted from query params
    log(
      { submittedQuiz: query.get('submitted'), quizioID: data.quizioID },
      false,
      false,
    );
    if (data.quizioID === query.get('submitted')) {
      log('match!', data.quizioID);
      setSubmitted(true);
    }
  }, [query]);

  useEffect(() => {
    log({ RegisterSuccess }, false, false);
    if (RegisterSuccess) {
      log('registered (from modal)!', { RegisterData }, false);
      setShowRegisterModal(false);
      // Set registered from registration modal
      setRegistered(true);
    }
  }, [RegisterSuccess, RegisterData]);

  useEffect(() => {
    // todo: convert to a hook
    if (isServerTimeSuccess) {
      setServerTime(dayjs(serverTimeData?.data?.data?.serverTime));
    }
  }, [isServerTimeSuccess]);

  useEffect(() => {
    // set submitted and registered from get all quizzes data
    setSubmitted(data.submitted);
    setRegistered(data.registered);
  }, [data]);

  return (
      <div className="quiz-card">
          <ToastContainer />
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
              <StartQuizModal
                quizID={data.quizioID || ''}
                setShowModal={setshowStartModal}
              />
          </ModalWrapper>
      )}

          <div className="banner-container">
              {data.bannerURL ? (
                  <div className="">
                      <img src={data.bannerURL} alt={data.name} />
                  </div>
        ) : (
            <QuizName />
        )}
              {!data.bannerURL && (
              <h3 className="name">
                  {data.name ? truncateQuizName(data.name) : 'Quiz Name'}
              </h3>
        )}
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
                      <>
                          {submitted ? (
                              <div className="registered">Submitted</div>
              ) : (
                  <>
                      {registered ? (
                          <>
                              {dayjs(data.startTime) > serverTime ? (
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
                      </>
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
