import React from 'react';
import { Switch, Route } from 'react-router-dom';
import QuizLanding from '@pages/GiveQuiz/QuizLanding';
import SectionLanding from '@pages/GiveQuiz//SectionLanding';
import GiveQuizWrapper from './GiveQuizWrapper';

const GiveQuiz = () => (
    <Switch>
        <Route
          exact
          path="/quiz/attempt/:quizID"
          render={() => (
              <GiveQuizWrapper>
                  <QuizLanding />
              </GiveQuizWrapper>
      )}
        />
        <Route
          exact
          path="/quiz/attempt/:quizID/:sectionID"
          render={() => (
              <GiveQuizWrapper>
                  <SectionLanding />
              </GiveQuizWrapper>
      )}
        />
    </Switch>
);

export default GiveQuiz;
