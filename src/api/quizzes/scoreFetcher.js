import axiosInstance from '@api/axiosInstance';

// eslint-disable-next-line import/prefer-default-export
export const getScore = () => axiosInstance.get('/sections/questions/:questionID/check');

export const updateScore = () => axiosInstance.put('/sections/questions/:questionID/check');
