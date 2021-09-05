// libs
import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { withCookies } from 'react-cookie';
import axios from 'axios'
// pages
import Home from './pages/home'
import Signin from './pages/signin';
import Signup from './pages/signup';
import Auth from './components/auth'
import Groups from './pages/groups'
import Arena from './pages/arena'
import Members from './pages/members'
import Results from './pages/results'
import UserResults from './pages/userResult';
import Users from './pages/users'
import AdminPanel from './pages/admin';
import createQuiz from './pages/createQuiz';

// styles
import './styles/main.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

// config
import config from './config/config.js';
const baseURL = config.API.baseURL;

axios.defaults.headers.common = {};
axios.defaults.withCredentials = true;
axios.defaults.baseURL = baseURL;
axios.defaults.headers.common.accept = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = baseURL;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = baseURL;

axios.defaults.headers.get['Access-Control-Allow-Origin'] = "http://localhost:3002/";
axios.defaults.headers.post['Access-Control-Allow-Origin'] = "http://localhost:3002/";


const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signin' component={Signin} />
      <Route exact path='/signup' component={Signup} />
      <Route exact path='/testauth' component={Auth} />
      <Route exact path='/groups' component={Groups} />
      <Route exact path='/admin/:quizId' component={AdminPanel} />
      <Route exact path='/createQuiz' component={createQuiz} />

      <Route exact path='/users/profile' component={Users} />

      <Route exact path='/:quizId'
        render={(props) => <Arena {...props} cookies={this.props.cookies} open={false} />}
      />
      <Route exact path='/groups/:groupId/quizzes/:quizId'
        render={(props) => <Arena {...props} cookies={this.props.cookies} open={true} />}
      />
      <Route exact path='/results/user/:quizId'
        render={(props) => <UserResults {...props} cookies={this.props.cookies} open={true} checkOwnership={true} />}
      />
      <Route exact path='/results/:quizId'
        render={(props) => <Results {...props} cookies={this.props.cookies} open={true} />}
      />
      <Route exact path='/groups/:groupId/members'
        render={(props) => <Members {...props} cookies={this.props.cookies} open={true} />}
      />
    </Switch>
  );

}

export default withCookies(App);
