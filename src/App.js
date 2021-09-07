import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { withCookies } from 'react-cookie';
import axiosInstance from './api/axiosInstance';

import Home from './pages/home'
import Signin from './pages/signin';
import ErrorPage from './pages/ErrorPage';

import config from './config/config.js';
const baseURL = config.API.baseURL;

axiosInstance.defaults.headers.common = {};
axiosInstance.defaults.baseURL = baseURL;
axiosInstance.defaults.headers.common.accept = 'application/json';
axiosInstance.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axiosInstance.defaults.headers.get['Access-Control-Allow-Origin'] = baseURL;
axiosInstance.defaults.headers.post['Access-Control-Allow-Origin'] = baseURL;

axiosInstance.defaults.headers.get['Access-Control-Allow-Origin'] = "http://localhost:3002/";
axiosInstance.defaults.headers.post['Access-Control-Allow-Origin'] = "http://localhost:3002/";


const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/signin' component={Signin} />
      <Route path="*" component={ErrorPage} />
    </Switch>
  );
}

export default withCookies(App);
