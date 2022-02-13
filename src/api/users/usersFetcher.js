import axiosInstance from '@api/axiosInstance';

export const getAllUsers = () => axiosInstance.get('/users');

export const getUserDetails = ({ queryKey }) => axiosInstance.get(`/users/${queryKey[1]}`);

export const getMyQuizzes = () => axiosInstance.get('/users/me/quizzes');
