import React from 'react';
import { Switch, Route } from 'react-router-dom';
import QuizLanding from '@components/pages/GiveQuiz/Landing/QuizLanding';
import SectionLanding from '@pages/GiveQuiz/Landing/SectionLanding';
import Wrapper from './Wrapper';

const GiveQuiz = () => (
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

export default GiveQuiz;
