import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '@pages/Landing';
import Register from '@pages/Register';
import CreateQuiz from '@pages/CreateQuiz';
import GiveQuiz from '@pages/GiveQuiz/index';
import './index.css';

const App = () => (
    <Router>
        <Switch>
            {/** NOT Logged IN */}
            {/* Join Us page (Landing) */}
            <Route exact path="/" component={Landing} />
            {/* Public profile page */}
            <Route path="/profile/:profileID" component={Landing} />

            {/** Logged IN */}
            {/* Dashboard page */}
            {/* <Route exact path="/" component={Dashboard} /> */}
            {/* Registration Page */}
            <Route exact path="/register" component={Register} />
            {/* Create or edit a quiz */}
            <Route exact path="/quiz/create" component={CreateQuiz} />
            {/* Create or edit a quiz */}
            <Route exact path="/quiz/edit" component={CreateQuiz} />
            {/* Check a quiz */}
            <Route path="/quiz/check/:quizID" component={CreateQuiz} />
            {/* Attempt a quiz */}
            <Route path="/quiz/:quizID" component={GiveQuiz} />
            {/* Private profile page */}
            <Route path="/profile/:profileID" component={Landing} />
        </Switch>
    </Router>
);

export default App;
