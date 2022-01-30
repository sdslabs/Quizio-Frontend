import axiosInstance from '@api/axiosInstance';

export const addSectionToQuiz = ({ quizId }) => axiosInstance.post(`/quizzes/${quizId}/sections`);

export const getSectionDetails = ({ queryKey }) => axiosInstance.get(`/quizzes/sections/${queryKey[1]?.sectionId}`);

export const updateSectionDetails = ({ sectionId, body }) => axiosInstance.put(`/quizzes/sections/${sectionId}`, body);

export const deleteSection = ({ sectionId }) => axiosInstance.delete(`/quizzes/sections/${sectionId}`);
