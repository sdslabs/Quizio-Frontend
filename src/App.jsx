import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '@pages/Landing';
import './index.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Landing} />
    </Switch>
  </Router>
);

export default App;
