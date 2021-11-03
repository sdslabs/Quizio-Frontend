import axios from 'axios';
import Cookies from 'js-cookie';
import { baseURL } from '../config/config';

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
  const { token } = Cookies.get();
  config2.headers.Authorization = `Bearer ${token}`;
  return config2;
});

export default axiosInstance;
