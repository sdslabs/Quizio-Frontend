import axiosInstance from '@api/axiosInstance';
import log from '@utils/log';

export const getAllUsers = () => axiosInstance.get('/users');

export const getUserPublicProfile = async ({ queryKey }) => {
	try {
		log('getuser public profile', { queryKey });
		const res = await axiosInstance.get(`/users/${queryKey[1]}`);
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

export const getMyQuizzes = () => axiosInstance.get('/users/me/quizzes');

export const checkIfEmailExists = async (emailID) => {
	try {
		const res = await axiosInstance.get(`/users/check/email/${emailID}`);
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};
