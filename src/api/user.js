import axiosInstance from './axiosInstance';

export const checkIfUserExists = async (email) => {
	try {
		const res = await axiosInstance.get(`/users/${email}`);
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

export const a = 'a';
