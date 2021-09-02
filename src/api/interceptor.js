import axios from 'axios';
const config = require('../config/config.json')

axios.defaults.withCredentials = true;


 let Authinterceptor = axios.interceptors.response.use(function (response) {

  if (response.data.authenticated === false)
  { 
    return window.location = "/";
  }
  else if (response.data.registered === false)
  {
    return window.location = '/';
  }
  else if (response.data.oauth === true)
  {
    return window.location = '/';
  }
  else{
    return response;
  }
}, function (error) {
  return Promise.reject(error);
});
export default Authinterceptor

