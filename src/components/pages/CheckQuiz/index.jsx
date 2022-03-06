import React from 'react';
import '@pagestyles/check_quiz/index.scss';
import { Route, Switch } from 'react-router-dom';
import MasterWrapper from '@pages/CheckQuiz/CheckResponse/MasterWrapper';
import ResponseList from './ResponseList';
import QuizLanding from './CheckResponse/QuizLanding';

const CheckQuiz = () => (
    <Switch>
        <Route path="/quiz/check/:quizID/:participantID/:sectionID" render={() => <MasterWrapper><QuizLanding /></MasterWrapper>} />
        <Route path="/quiz/check/:quizID" component={ResponseList} />
    </Switch>
);

export default CheckQuiz;
