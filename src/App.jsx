import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Landing from '@pages/Landing';
import Login from '@pages/Login';

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Login} />
        </Switch>
    </Router>
);

export default App;
