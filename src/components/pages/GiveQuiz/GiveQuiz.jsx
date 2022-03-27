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
import MediaAccess from './MediaAccess';
import 'react-toastify/dist/ReactToastify.css';

const GiveQuiz = () => {
  const handle = useFullScreenHandle();
  const history = useHistory();
  const [isOnFS, setIsOnFS] = useState(false);
  const [isMediaPermission, setIsMediaPermission] = useState(false);
  const { mutate: updateLogs } = useUpdateLogs();
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
    updateLogs({ body: { quizID, logType } });
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
      toast.info('Audio and Video Permission detected. You may start the quiz!', {
        position: 'top-right',
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: false,
        closeButton: false,
        progress: undefined,
      });
    }
  }, [isMediaPermission]);

  useEffect(async () => {
    tinykeys(window, {
      'Control+KeyF': async (event) => {
        event.preventDefault();
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
      '$mod+KeyF': async (event) => event.preventDefault(),

      F1: async (event) => event.preventDefault(),
      F2: async (event) => event.preventDefault(),
      F3: async (event) => event.preventDefault(),
      F4: async (event) => event.preventDefault(),
      F5: async (event) => event.preventDefault(),
      F6: async (event) => event.preventDefault(),
      F7: async (event) => event.preventDefault(),
      F8: async (event) => event.preventDefault(),
      F9: async (event) => event.preventDefault(),
      F10: async (event) => event.preventDefault(),
      F11: async (event) => event.preventDefault(),
      F12: async (event) => event.preventDefault(),
    });

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        updateLogs({
          body: {
            quizID,
            logType: 'Latitude',
            logData: position.coords.latitude,
          },
        });
        updateLogs({
          body: {
            quizID,
            logType: 'Longitude',
            logData: position.coords.longitude,
          },
        });
      });
    } else {
      updateLogs({
        body: { quizID, logType: 'IP', logData: 'geolocation not available' },
      });
    }
  }, []);

  if (isSubmittedLoading) return <LoadingPage />;

  if (!isOnFS) {
    return (
        <>
            <ToastContainer />
            <MediaAccess setIsMediaPermission={setIsMediaPermission} />
            <FullScreen handle={handle} onChange={reportChange} />
        </>
    );
  }

  if (!isMediaPermission) {
    return (
        <>
            <ToastContainer />
            <MediaAccess setIsMediaPermission={setIsMediaPermission} />
        </>
    );
  }

  return (
      <>
          {/* I dont know why, but adding this toast container here is important */}
          <ToastContainer />
          <MediaAccess setIsMediaPermission={setIsMediaPermission} />
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
