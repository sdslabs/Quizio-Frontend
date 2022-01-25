import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '@pages/Landing';
import Login from '@pages/Login';
import testQuiz from '@pages/testQuiz';
import Register from '@pages/Register';
import CreateQuiz from '@pages/CreateQuiz';
import './index.css';
import GiveQuiz from './components/pages/GiveQuiz/index';

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/quiz/create" component={CreateQuiz} />
            <Route exact path="/quiz/:id" component={GiveQuiz} />
            <Route exact path="/bc" component={testQuiz} />

        </Switch>
    </Router>
);

export default App;
