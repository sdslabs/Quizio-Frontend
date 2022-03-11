import axiosInstance from '@api/axiosInstance';
import log from '@utils/log';

export const getAllUsers = () => axiosInstance.get('/api/v2/users');

export const getUserPublicProfile = async ({ queryKey }) => {
	try {
		log('getuser public profile', { queryKey });
		const res = await axiosInstance.get(`/api/v2/users/${queryKey[1]?.userID}`);
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

export const getMyQuizzes = () => axiosInstance.get('/api/v2/users/me/quizzes');

export const checkIfEmailExists = async (emailID) => {
	try {
		const res = await axiosInstance.get(`/users/check/email/${emailID}`);
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};
