import axiosInstance from '@api/axiosInstance';

export const getAllRegistrants = ({ queryKey }) => axiosInstance.get(`/api/v2/register/quizzes/${queryKey[1]?.quizId}`);

export const registerParticipant = ({ quizId, username }) => axiosInstance.post('/api/v2/register/quizzes/', { quizId, username });

export const unregisterParticipant = ({ quizId, username }) => axiosInstance.delete(`/api/v2/register/quizzes/${quizId}/${username}`);
