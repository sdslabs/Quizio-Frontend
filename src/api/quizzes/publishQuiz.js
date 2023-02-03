import axiosInstance from '@api/axiosInstance';

export const publishQuiz = async ({ quizID }) => {
	try {
		const res = await axiosInstance.post(`/quizzes/${quizID}/publish`);
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};
