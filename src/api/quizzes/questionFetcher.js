import axiosInstance from '@api/axiosInstance';

export const addQuestionToSection = ({ sectionId }) => axiosInstance.post(`/api/v2/quizzes/sections/${sectionId}/questions`);

export const getQuestionById = ({ queryKey }) => axiosInstance.get(`/api/v2/quizzes/sections/questions/${queryKey[1]?.questionId}`);

export const updateQuestionById = ({ questionId, body }) => axiosInstance.put(`/api/v2/quizzes/sections/questions/${questionId}`, body);

export const deleteQuestionById = ({ questionId }) => axiosInstance.delete(`/api/v2/quizzes/sections/questions/${questionId}`);
