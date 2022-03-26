/* eslint-disable import/prefer-default-export */
import axiosInstance from '@api/axiosInstance';

export const getCurrentServerTime = () => axiosInstance.get('/utils/time/now');
