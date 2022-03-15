import axiosInstance from '@api/axiosInstance';

export const createNewQuiz = () => axiosInstance.post('/quizzes');

export const getAllQuizzes = async () => {
	try {
		const res = await axiosInstance.get('/quizzes');
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

export const getQuizRankList = ({ queryKey }) => axiosInstance.post(`/quizzes/${queryKey[1]}/ranklist`);

export const getQuizById = ({ queryKey }) => axiosInstance.get(`/quizzes/${queryKey[1]}`);

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
