import axiosInstance from './axiosInstance';

export const getQuizzes = async () => {
	const quizzes = await axiosInstance.get('/quizzes');
	return quizzes.data.data.quizzes;
};

export const t = 1;
