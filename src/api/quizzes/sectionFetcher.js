import axiosInstance from '@api/axiosInstance';

export const addSectionToQuiz = ({ quizID }) => axiosInstance.post(`/quizzes/${quizID}/sections`);

export const getSectionDetails = ({ queryKey }) => axiosInstance.get(`/quizzes/sections/${queryKey[1]}`);

export const updateSectionDetails = ({ sectionId, body }) => axiosInstance.put(`/quizzes/sections/${sectionId}`, body);

export const deleteSection = ({ sectionId }) => axiosInstance.delete(`/quizzes/sections/${sectionId}`);
