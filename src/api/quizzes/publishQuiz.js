import axiosInstance from '@api/axiosInstance';

// eslint-disable-next-line import/prefer-default-export
export const publishQuiz = async ({ quizID }) => {
	try {
		const res = await axiosInstance.post(`/quizzes/${quizID}/publish`);
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};
