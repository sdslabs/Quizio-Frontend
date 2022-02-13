import axiosInstance from '@api/axiosInstance';

/**
 * !!! DO NOT CHANGE !!!
 * Check if the user is logged in by sending the jwtToken in cookies
 * @returns userData if user is logged in else error message
 */
export const checkAuth = async () => {
	try {
		const res = await axiosInstance.get('/auth/check');
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};

/**
 * !!! DO NOT CHANGE !!!
 * Login the user by sending jwtToken
 * @returns userData if user is logged in else error message
 */
export const loginWithJwtToken = async (jwtToken) => {
	try {
		const res = await axiosInstance.get(`/auth/login?jwtToken=${jwtToken}`);
		return res.data;
	} catch (e) {
		return e.response.data;
	}
};
