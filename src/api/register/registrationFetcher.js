import axiosInstance from '@api/axiosInstance';

export const getAllRegistrants = ({ queryKey }) => axiosInstance.get(`/register/users/quizzes/${queryKey[1]}`);

export const registerParticipant = ({ quizId, username }) => axiosInstance.post('/api/v2/register/quizzes/', { quizId, username });

export const unregisterParticipant = ({ quizId, username }) => axiosInstance.delete(`/api/v2/register/quizzes/${quizId}/${username}`);
