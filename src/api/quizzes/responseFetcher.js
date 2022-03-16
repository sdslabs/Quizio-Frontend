/* eslint-disable import/prefer-default-export */
import axiosInstance from '@api/axiosInstance';

export const getResponse = () => axiosInstance.get('/responses');

export const updateResponse = ({ body }) => axiosInstance.put('/responses', body);
