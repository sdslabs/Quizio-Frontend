import React, { useEffect, useState, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Switch, Route } from 'react-router-dom';
import tinykeys from 'tinykeys';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import QuizLanding from '@components/pages/GiveQuiz/Landing/QuizLanding';
import SectionLanding from '@pages/GiveQuiz/Landing/SectionLanding';
import { useUpdateLogs } from '@api/quizzes/useLogs';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Wrapper from './Wrapper';
import 'react-toastify/dist/ReactToastify.css';

const GiveQuiz = () => {
  const handle = useFullScreenHandle();
  const [isOnFS, setIsOnFS] = useState(false);
  const userID = useSelector((state) => state.auth.user.userID);
  const { mutate } = useUpdateLogs();
  const { quizID } = useParams();

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
    mutate({ userID, body: { quizID, logType } });
  };

  const reportChange = useCallback(
    (state) => {
      if (state === false) {
        setIsOnFS(false);
        toast.dark(
          'Quiz must be given on full Screen! Press `F` to go to fullscreen',
          {
            position: 'top-center',
            autoClose: false,
            hideProgressBar: true,
            closeOnClick: false,
            closeButton: false,
            progress: undefined,
          },
        );
      }
    },
    [handle],
  );

  useEffect(() => {
    tinykeys(window, {
      f: async () => {
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
  }, []);

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
