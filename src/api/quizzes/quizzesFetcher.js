import axiosInstance from '@api/axiosInstance';

export const createNewQuiz = () => axiosInstance.post('/api/v2/quizzes');

export const getAllQuizzes = () => axiosInstance.get('/api/v2/quizzes');

export const getQuizById = ({ quizId }) => axiosInstance.get(`/api/v2/quizzes/${quizId}`);

export const updateQuizById = ({ quizId, body }) => axiosInstance.put(`/api/v2/quizzes/${quizId}`, body);

export const deleteQuizById = ({ quizId }) => axiosInstance.delete(`/api/v2/quizzes/${quizId}`);
