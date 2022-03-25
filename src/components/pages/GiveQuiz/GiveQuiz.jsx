import React, { useEffect, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
 Switch, Route, useParams, useHistory,
} from 'react-router-dom';
import tinykeys from 'tinykeys';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import LoadingPage from '@components/pages/Loading';
import QuizLanding from '@components/pages/GiveQuiz/Landing/QuizLanding';
import { useCheckIfQuizIsSubmitted } from '@api/quizzes/useQuizzes';
import SectionLanding from '@pages/GiveQuiz/Landing/SectionLanding';
import { useUpdateLogs } from '@api/quizzes/useLogs';
import log from '@utils/log';
import Wrapper from './Wrapper';
import 'react-toastify/dist/ReactToastify.css';

const GiveQuiz = () => {
  const handle = useFullScreenHandle();
  const history = useHistory();
  const [isOnFS, setIsOnFS] = useState(false);
  const { mutate } = useUpdateLogs();
  const { quizID } = useParams();
  const {
    data: isSubmittedData,
    isLoading: isSubmittedLoading,
    isSuccess: isSubmittedCheckSuccess,
  } = useCheckIfQuizIsSubmitted(quizID);

  const handleSusAction = (logType) => {
    toast.warn(
      'Action logged, avoid using suspicious key presses during quiz.',
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
    mutate({ body: { quizID, logType } });
  };

  const reportChange = useCallback(
    (state) => {
      if (state === false) {
        setIsOnFS(false);
        toast.dark(
          'Quiz must be given on full Screen! Press `Ctrl + F` to go to fullscreen',
          {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            closeButton: false,
            progress: undefined,
          },
        );
      } else {
        toast.dismiss();
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

  useEffect(async () => {
    tinykeys(window, {
      'Control+KeyF': async () => {
        if (!handle.active) {
          await handle.enter();
          setIsOnFS(true);
        }
      },
      '$mod+KeyC': () => {
        handleSusAction('COPY');
      },
      '$mod+KeyV': () => {
        handleSusAction('PASTE');
      },
      'Control+Shift+KeyI': () => {
        handleSusAction('INSPECT');
      },
    });

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        mutate({
          body: {
            quizID,
            logType: 'Latitude',
            logData: position.coords.latitude,
          },
        });
        mutate({
          body: {
            quizID,
            logType: 'Longitude',
            logData: position.coords.longitude,
          },
        });
      });
    } else {
      mutate({
        body: { quizID, logType: 'IP', logData: 'geolocation not available' },
      });
    }
  }, []);

  if (isSubmittedLoading) return <LoadingPage />;

  if (!isOnFS) {
    return (
        <>
            <ToastContainer />
            <FullScreen handle={handle} onChange={reportChange} />
        </>
    );
  }

  return (
      <>
          {/* I dont know why, but adding this toast container here is important */}
          <ToastContainer />
          <FullScreen handle={handle} onChange={reportChange} className="bg-white">
              <Switch>
                  <Route
                    exact
                    path="/quiz/attempt/:quizID"
                    render={() => (
                        <Wrapper>
                            <ToastContainer />
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
