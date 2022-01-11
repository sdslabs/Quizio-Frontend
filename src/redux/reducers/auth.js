import {
	SET_USER,
	LOG_OUT,
} from '@types/auth';

const initialState = {
	isLoggedIn: false,
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
		case LOG_OUT:
			return {
				...state,
				isLoggedIn: false,
				user: {},
			};
		default:
			return state;
	}
};

export default authReducer;
