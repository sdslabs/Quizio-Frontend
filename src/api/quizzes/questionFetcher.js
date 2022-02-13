import axiosInstance from '@api/axiosInstance';

export const addQuestionToSection = ({ sectionId }) => axiosInstance.post(`/quizzes/sections/${sectionId}/questions`);

export const getQuestionById = ({ queryKey }) => axiosInstance.get(`/quizzes/sections/questions/${queryKey[1]?.questionId}`);

export const updateQuestionById = ({ questionId, body }) => axiosInstance.put(`/quizzes/sections/questions/${questionId}`, body);

export const deleteQuestionById = ({ questionId }) => axiosInstance.delete(`/quizzes/sections/questions/${questionId}`);
