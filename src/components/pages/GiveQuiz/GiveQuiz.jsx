import React, { useEffect, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
 Switch, Route, useParams, useHistory,
} from 'react-router-dom';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import LoadingPage from '@components/pages/Loading';
import QuizLanding from '@components/pages/GiveQuiz/Landing/QuizLanding';
import { useCheckIfQuizIsSubmitted } from '@api/quizzes/useQuizzes';
import SectionLanding from '@pages/GiveQuiz/Landing/SectionLanding';
import { useUpdateLogs } from '@api/quizzes/useLogs';
import log from '@utils/log';
import 'react-toastify/dist/ReactToastify.css';
import { useGetResponseStatus } from '@api/quizzes/useResponse';
import useGiveQuizStore from '@redux/store/zustand/giveQuiz';
import { useSelector } from 'react-redux';
import Wrapper from './Wrapper';
import MediaAccess from './MediaAccess';
import WindowFocus from './WindowFocus';
import useKeyLogging from './useKeyLogging';
import useLocationAccess from './useLocationAccess';

const GiveQuiz = () => {
  const handle = useFullScreenHandle();
  const history = useHistory();
  const { quizID } = useParams();

  const userID = useSelector((state) => state.auth.user.userID);
  const [isOnFS, setIsOnFS] = useState(false);
  const [isMediaPermission, setIsMediaPermission] = useState(false);

  // Update logs mutation
  const { mutate: updateLogs } = useUpdateLogs();

  // location access
  const [hasLocationAccess] = useLocationAccess({
    updateLogs,
    quizID,
    toast,
  });

  // Key logging
  useKeyLogging({
    toast,
    updateLogs,
    quizID,
    handle,
    setIsOnFS,
  });

  // Quiz check submit query
  const {
    data: isSubmittedData,
    isLoading: isSubmittedLoading,
    isSuccess: isSubmittedCheckSuccess,
  } = useCheckIfQuizIsSubmitted(quizID);

  // Give quiz Store
  const {
    setAnsweredQuestions,
    setMarkedAnsweredQuestions,
    setMarkedQuestions,
  } = useGiveQuizStore();

  // Get Response Status Query
  const {
    data: responseStatusData,
    isSuccess: isResponseStatusSuccess,
  } = useGetResponseStatus(userID, quizID);

  // handle response status
  useEffect(() => {
    if (isResponseStatusSuccess) {
      const answeredQuestions = responseStatusData?.data?.data
        .filter((val) => val.status === 'answered')
        .map((val) => val.questionID);
      const markedAnsweredQuestions = responseStatusData?.data?.data
        .filter((val) => val.status === 'marked-answered')
        .map((val) => val.questionID);
      const markedQuestions = responseStatusData?.data?.data
        .filter((val) => val.status === 'marked')
        .map((val) => val.questionID);

      setAnsweredQuestions(answeredQuestions);
      setMarkedAnsweredQuestions(markedAnsweredQuestions);
      setMarkedQuestions(markedQuestions);
    }
  }, [isResponseStatusSuccess, responseStatusData]);

  const handleBlurred = () => {
    toast.warn(
      'Action logged (TAB CHANGE), avoid using any other tab/window/program during quiz.',
      {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      },
    );
    updateLogs({ body: { quizID, logType: 'TABCHANGE' } });
  };

  const reportChange = useCallback(
    (state) => {
      if (state === false) {
        setIsOnFS(false);
        toast.dark(
          'Quiz must be given on Full Screen. Press `Ctrl + F` to go to Fullscreen',
          {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            closeButton: false,
            progress: undefined,
            toastId: 'fsToast',
          },
        );
      } else {
        toast.dismiss('fsToast');
      }
    },
    [handle],
  );

  useEffect(() => {
    if (isSubmittedCheckSuccess) {
      if (isSubmittedData?.data?.submitted) {
        history.push('/');
      }
    }
  }, [isSubmittedCheckSuccess]);

  useEffect(() => {
    log({ quizID });
  }, [quizID]);

  useEffect(() => {
    if (!isMediaPermission) {
      toast.error(
        'Please allow microphone and camera access for the quiz to start',
        {
          position: 'top-right',
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: false,
          closeButton: false,
          progress: undefined,
          toastId: 'mediaToast',
        },
      );
    } else {
      toast.dismiss('mediaToast');
      toast.info('Microphone and Camera access detected!', {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        closeButton: false,
        progress: undefined,
      });
    }
  }, [isMediaPermission]);

  useEffect(() => {
    log({ hasLocationAccess });
    if (hasLocationAccess) {
      toast.info(
        'Location access detected!',
        {
          position: 'top-left',
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: false,
          closeButton: false,
          progress: undefined,
        },
      );
    }
  }, [hasLocationAccess]);

  if (isSubmittedLoading) return <LoadingPage />;

  if (!isOnFS) {
    return (
        <>
            <ToastContainer />
            <MediaAccess
              setIsMediaPermission={setIsMediaPermission}
              hidden={false}
            />
            <FullScreen handle={handle} onChange={reportChange} />
        </>
    );
  }

  if (!isMediaPermission) {
    return (
        <>
            <ToastContainer />
            <MediaAccess
              setIsMediaPermission={setIsMediaPermission}
              hidden={false}
            />
        </>
    );
  }

  if (!hasLocationAccess) {
    return (
        <>
            <ToastContainer />
            <MediaAccess
              setIsMediaPermission={setIsMediaPermission}
              hidden={false}
            />
        </>
    );
  }

  return (
      <>
          {/* I dont know why, but adding this toast container here is important */}
          <ToastContainer />
          <MediaAccess setIsMediaPermission={setIsMediaPermission} hidden />
          <FullScreen handle={handle} onChange={reportChange} className="bg-white">
              <Switch>
                  <Route
                    exact
                    path="/quiz/attempt/:quizID"
                    render={() => (
                        <Wrapper>
                            <ToastContainer />
                            <WindowFocus handleBlurred={handleBlurred} />
                            <QuizLanding />
                        </Wrapper>
            )}
                  />
                  <Route
                    exact
                    path="/quiz/attempt/:quizID/:sectionID"
                    render={() => (
                        <Wrapper>
                            <ToastContainer />
                            <WindowFocus handleBlurred={handleBlurred} />
                            <SectionLanding />
                        </Wrapper>
            )}
                  />
              </Switch>
          </FullScreen>
      </>
  );
};

export default GiveQuiz;
