import React from 'react';
import { Switch, Route } from 'react-router-dom';
import QuizLanding from '@pages/GiveQuiz/QuizLanding';
import SectionLanding from '@pages/GiveQuiz//SectionLanding';
import MasterWrapper from './MasterWrapper';

const GiveQuiz = () => (
    <Switch>
        <Route exact path="/quiz/attempt/:quizID" render={() => <MasterWrapper><QuizLanding /></MasterWrapper>} />
        <Route exact path="/quiz/attempt/:quizID/:sectionID" render={() => <MasterWrapper><SectionLanding /></MasterWrapper>} />
    </Switch>
);

export default GiveQuiz;
