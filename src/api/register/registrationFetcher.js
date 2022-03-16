import axiosInstance from '@api/axiosInstance';

export const getAllRegistrants = ({ queryKey }) => axiosInstance.get(`/register/users/quizzes/${queryKey[1]}`);

export const registerParticipant = ({ quizID, username }) => axiosInstance.post('/api/v2/register/quizzes/', { quizID, username });

export const unregisterParticipant = ({ quizID, username }) => axiosInstance.delete(`/api/v2/register/quizzes/${quizID}/${username}`);
