import axiosInstance from '@api/axiosInstance';

// eslint-disable-next-line import/prefer-default-export
export const getScore = ({ questionID, body }) => axiosInstance.get(`/quizzes/sections/questions/${questionID}/check`, body);

export const updateScore = ({ questionID, body }) => axiosInstance.put(`/quizzes/sections/questions/${questionID}/check`, body);
