import axiosInstance from '@api/axiosInstance';

export const createNewQuiz = async () => {
	try {
		const res = await axiosInstance.post('/quizzes');
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

export const getAllQuizzes = async () => {
	try {
		const res = await axiosInstance.get('/quizzes');
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

export const getQuizById = async ({ queryKey }) => {
	try {
		const res = await axiosInstance.get(`/quizzes/${queryKey[1]}`);
		return res.data.data;
	} catch (e) {
		return e.response.data;
	}
};

export const updateQuizById = ({ quizId, body }) => axiosInstance.put(`/quizzes/${quizId}`, body);

export const deleteQuizById = ({ quizId }) => axiosInstance.delete(`/quizzes/${quizId}`);

export const getAllQuizzesForUser = async () => {
	try {
		const res = await axiosInstance.get('/users/quizzes/owned');
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};
