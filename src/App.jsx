import React from 'react';
import Landing from '@pages/Landing';
import Login from '@pages/Login';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';

const App = () => (
	<Router>
		<Switch>
			<Route exact path="/" component={Landing} />
			<Route exact path="/login" component={Login} />
		</Switch>
	</Router>
);

export default App;
