import {
	SET_USER, SET_JWT_TOKEN, LOG_OUT,
} from '@types/auth';

const initialState = {
	isLoggedIn: false,
	token: '',
	user: {},
};

const authReducer = (state = initialState, action) => {
	const { type, payload } = action;
	switch (type) {
	case SET_USER:
		return {
			...state,
			user: payload,
			isLoggedIn: true,
		};
	case SET_JWT_TOKEN:
		return {
			...state,
			token: payload,
		};
	case LOG_OUT:
		return {
			...state,
			isLoggedIn: false,
			token: '',
			user: {},
		};
	default:
		return initialState;
	}
};

export default authReducer;
