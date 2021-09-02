import axios from 'axios';
import cookie from 'react-cookies'

const config = require('../config/config.json')
axios.defaults.withCredentials = true;

let headerInterceptor = axios.interceptors.request.use(function (config) {
  const token = cookie.load('token');
  config.headers.Authorization =  token;
  return config;
});

export default headerInterceptor
