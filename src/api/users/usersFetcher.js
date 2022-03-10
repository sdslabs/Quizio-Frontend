import axiosInstance from '@api/axiosInstance';

export const getAllUsers = () => axiosInstance.get('/api/v2/users');

export const getUserDetails = ({ queryKey }) => axiosInstance.get(`/api/v2/users/${queryKey[1]?.username}`);

export const getMyQuizzes = () => axiosInstance.get('/api/v2/users/me/quizzes');

export const checkIfEmailExists = (emailID) => axiosInstance.get(`/users/check/email/${emailID}`);
