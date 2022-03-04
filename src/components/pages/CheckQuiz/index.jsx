import React from 'react';
import '@pagestyles/check_quiz/index.scss';
import { Route, Switch } from 'react-router-dom';
import ResponseList from './ResponseList';

const CheckQuiz = () => (
    <Switch>
        <Route path="/quiz/check/:quizID" component={ResponseList} />
        <Route path="/quiz/check/:quizID/:participantID" component={ResponseList} />
    </Switch>
);

export default CheckQuiz;
