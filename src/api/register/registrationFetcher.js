import axiosInstance from '@api/axiosInstance';

export const getAllRegistrants = ({ queryKey }) => axiosInstance.get(`/register/users/quizzes/${queryKey[1]}`);

export const registerParticipant = ({ body }) => axiosInstance.post('/register/quizzes', body);

export const unregisterParticipant = ({ quizID, username }) => axiosInstance.delete(`/api/v2/register/quizzes/${quizID}/${username}`);

export const checkIfUserIsRegisteredForQuiz = ({ queryKey }) => axiosInstance.get(`/register/quizzes/${queryKey[1]}`);
