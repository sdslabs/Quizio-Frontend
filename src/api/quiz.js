import axiosInstance from './axiosInstance';

export const getQuizzes = async () => {
	try {
		const res = await axiosInstance.get('/quizzes');
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

export const createQuiz = async (quizData) => {
	try {
		const res = await axiosInstance
			.post('/quizzes/quiz-details', { quiz: quizData });

		return res.data;
	} catch (e) {
		return e.response.data;
	}
};
