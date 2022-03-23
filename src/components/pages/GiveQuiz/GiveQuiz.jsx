/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import QuizLanding from '@components/pages/GiveQuiz/Landing/QuizLanding';
import SectionLanding from '@pages/GiveQuiz/Landing/SectionLanding';
import tinykeys from 'tinykeys';
import { useUpdateLogs } from '@api/quizzes/useLogs';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Wrapper from './Wrapper';

const GiveQuiz = () => {
    const userID = useSelector((state) => state.auth.user.userID);
    const {
      mutate,
    } = useUpdateLogs();
    const { quizID } = useParams();
    const handleSusAction = (logType) => {
      alert('Action logged, avoid using suspicious key presses during quiz.');
      mutate({ userID, body: { quizID, logType } });
    };
      useEffect(() => {
        tinykeys(window, {
          'Meta+KeyC': () => {
            handleSusAction('COPY');
          },
          'Meta+KeyV': () => {
            handleSusAction('PASTE');
          },
          'Control+KeyC': () => {
            handleSusAction('COPY');
          },
          'Control+KeyV': () => {
            handleSusAction('PASTE');
          },
          'Control+Shift+KeyI': () => {
            handleSusAction('INSPECT');
          },
        });
      }, []);
    return (
        <Switch>
            <Route
              exact
              path="/quiz/attempt/:quizID"
              render={() => (
                  <Wrapper>
                      <QuizLanding />
                  </Wrapper>
          )}
            />
            <Route
              exact
              path="/quiz/attempt/:quizID/:sectionID"
              render={() => (
                  <Wrapper>
                      <SectionLanding />
                  </Wrapper>
          )}
            />
        </Switch>
    );
};

export default GiveQuiz;
