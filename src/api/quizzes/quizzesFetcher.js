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

export const getQuizByID = async ({ queryKey }) => {
	try {
		console.log('fetching', queryKey);
		const res = await axiosInstance.get(`/quizzes/${queryKey[1]}`);
		return res.data.data;
	} catch (e) {
		return e.response.data;
	}
};

export const updateQuizByID = async ({ quizID, body }) => {
	try {
		const res = await axiosInstance.put(`/quizzes/${quizID}`, body);
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

export const deleteQuizByID = async ({ quizID }) => {
	try {
		const res = await axiosInstance.delete(`/quizzes/${quizID}`);
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

export const getAllQuizzesForUser = async () => {
	try {
		const res = await axiosInstance.get('/users/quizzes/owned');
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

export const getQuizRankList = ({ queryKey }) => axiosInstance.post(`/quizzes/${queryKey[1]}/ranklist`);
