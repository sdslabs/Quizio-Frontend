import React from 'react';
import '@pagestyles/check_quiz/index.scss';
import { Route, Switch } from 'react-router-dom';
import MasterWrapper from '@pages/CheckQuiz/CheckResponse/MasterWrapper';
import ResponseList from './ResponseList';
import QuestionsWrapper from './CheckResponse/Questions';

const CheckQuiz = () => (
    <Switch>
        <Route path="/quiz/check/:quizID" component={ResponseList} />
        <Route
          path="/quiz/check/:quizID/:participantID/:sectionID"
          render={() => (
              <MasterWrapper>
                  <QuestionsWrapper />
              </MasterWrapper>
      )}
        />
        <Route
          path="/quiz/check/:quizID/:participantID/"
          render={() => (
              <MasterWrapper>
                  <QuestionsWrapper />
              </MasterWrapper>
      )}
        />
    </Switch>
);

export default CheckQuiz;
