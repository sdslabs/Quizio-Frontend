import axiosInstance from '@api/axiosInstance';

export const addQuestionToSection = ({ sectionID }) => axiosInstance.post(`/quizzes/sections/${sectionID}/questions`);

export const getQuestionByID = ({ queryKey }) => axiosInstance.get(`/quizzes/sections/questions/${queryKey[1]}`);

export const updateQuestionByID = ({ questionID, body }) => axiosInstance.put(`/quizzes/sections/questions/${questionID}`, body);

export const deleteQuestionByID = ({ questionID }) => axiosInstance.delete(`/quizzes/sections/questions/${questionID}`);

export const toggleQuestionType = ({ questionID }) => axiosInstance.put(`/quizzes/sections/questions/${questionID}/toggle`);

export const addChoiceToQuestion = ({ questionID, body }) => axiosInstance.put(`/quizzes/sections/questions/${questionID}/choices`, body);

export const deleteChoiceInQuestion = ({ questionID, choiceID }) => axiosInstance
	.delete(`/quizzes/sections/questions/${questionID}/choices/${choiceID}`);
