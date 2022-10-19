import axiosInstance from '@api/axiosInstance';
import log from '@utils/log';

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
		log('fetching Quiz', { quizID: queryKey[1] }, { accessCode: queryKey[2] });
		const res = await axiosInstance.get(`/quizzes/${queryKey[1]}/${queryKey[2]}`);
		return res.data.data;
	} catch (e) {
		return e.response.data;
	}
};

export const getAccessCode = async ({ queryKey }) => {
	try {
		log('fetching Access Code', { quizID: queryKey[1] });
		const res = await axiosInstance.get(`/quizzes/${queryKey[1]}/accessCode`);
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

export const submitQuizByID = async ({ quizID }) => {
	try {
		const res = await axiosInstance.post(`/submit/${quizID}`);
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

export const checkIfQuizIsSubmitted = async ({ queryKey }) => {
	try {
		const res = await axiosInstance.get(`/submit/${queryKey[1]}`);
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

export const getQuizzesCreatedByUser = async () => {
	try {
		const res = await axiosInstance.get('/users/quizzes/owned');
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

// export const getQuizByIDWithAccessCode = async ({ queryKey }) => {
// 	try {
// 		log('fetching Quiz with access code', { quizID: queryKey[1] }, { accessCode: queryKey[2] });
// 		const res = await axiosInstance.get(`/quizzes/${queryKey[1]}/${queryKey[2]}`);
// 		return res.data.data;
// 	} catch (e) {
// 		return e.response.data;
// 	}
// };

export const getQuizRankList = ({ queryKey }) => axiosInstance.post(`/quizzes/${queryKey[1]}/ranklist`);
