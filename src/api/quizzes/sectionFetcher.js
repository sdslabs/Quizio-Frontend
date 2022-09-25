import axiosInstance from '@api/axiosInstance';

export const addSectionToQuiz = ({ quizID }) => axiosInstance.post(`/quizzes/${quizID}/sections`);

export const getSectionDetails = ({ queryKey }) => axiosInstance.get(`/quizzes/${queryKey[2]}/sections/${queryKey[1]}`);

export const updateSectionDetails = ({ sectionID, body }) => axiosInstance.put(`/quizzes/sections/${sectionID}`, body);

export const deleteSection = ({ sectionID }) => axiosInstance.delete(`/quizzes/sections/${sectionID}`);
