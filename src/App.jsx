import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Landing from '@pages/Landing';
import Login from '@pages/Login';
import Signup from '@pages/SignUp';

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
        </Switch>
    </Router>
);

export default App;
