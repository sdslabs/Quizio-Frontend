import axiosInstance from '@api/axiosInstance';

export const addSectionToQuiz = ({ quizId }) => axiosInstance.post(`/api/v2/quizzes/${quizId}/sections`);

export const getSectionDetails = ({ queryKey }) => axiosInstance.get(`/api/v2/quizzes/sections/${queryKey[1]?.sectionId}`);

export const updateSectionDetails = ({ sectionId, body }) => axiosInstance.put(`/api/v2/quizzes/sections/${sectionId}`, body);

export const deleteSection = ({ sectionId }) => axiosInstance.delete(`/api/v2/quizzes/sections/${sectionId}`);
