import axiosInstance from '@api/axiosInstance';

export const getAllRegistrants = ({ queryKey }) => axiosInstance.get(`/register/quizzes/${queryKey[1]?.quizId}`);

export const registerParticipant = ({ quizId }) => axiosInstance.post(`/register/quizzes/${quizId}`);

export const unregisterParticipant = ({ quizId }) => axiosInstance.delete(`/register/quizzes/${quizId}`);
