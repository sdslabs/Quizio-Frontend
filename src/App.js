import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { withCookies } from 'react-cookie';
import Home from './pages/home'
// import './styles/main.scss'
// import Groups from './pages/groups'
// import Arena from './pages/arena'
// import Members from './pages/members'
// import Results from './pages/results'
// import UserResults from './pages/userResult';
// import Signup from './pages/signup';
// import Signin from './pages/signin';
// import Users from './pages/users'
// import AdminPanel from './pages/admin';
// import createQuiz from './pages/createQuiz';
// import axios from 'axios'
// const config = require('./config/config.json');
// const baseURL = config.API.baseURL;

// axios.defaults.headers.common = {};
// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = baseURL;
// axios.defaults.headers.common.accept = 'application/json';
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = baseURL;
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = baseURL;

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        {/* <Route exact path='/groups' component={Groups} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
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
        /> */}
      </Switch>
    );
  }
}

export default withCookies(App);
