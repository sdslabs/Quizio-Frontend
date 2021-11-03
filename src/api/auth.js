import axiosInstance from './axiosInstance';

export const Login = async () => {
	try {
		const user = await axiosInstance.get('/auth/login');
		if (user.status === 200) {
			return user.data.data;
		}
	} catch (e) {
		console.error(e);
		return null;
	}
	return null;
};

export const Logout = async () => {
	const response = await axiosInstance.get('/auth/logout');
	console.log(response);
};
