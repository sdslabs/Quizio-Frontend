import axios from 'axios';
import { baseURL } from '../config/config';
import store from '../redux/store/store';

// Creates an axios instance for sending API requests through axios
const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  baseURL,
});

axiosInstance.interceptors.request.use((config) => {
  const config2 = config;
  const { token } = store.getState().auth;
  config2.headers.Authorization = `Bearer ${token}`;

  return config2;
});

export default axiosInstance;
