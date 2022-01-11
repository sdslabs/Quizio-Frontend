import {
	SET_USER,
	LOG_OUT,
} from '@types/auth';

export const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

export const logout = () => ({
	type: LOG_OUT,
});
