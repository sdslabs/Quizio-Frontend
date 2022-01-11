import {
	SET_CREATEQUIZ_STAGE,
	SET_CREATEQUIZ_ID,
} from '@types/quiz';

const initialState = {
	createQuizStage: 'Quiz Details',
	createQuizId: '',
};

const quizReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_CREATEQUIZ_STAGE:
			return {
				...state,
				createQuizStage: payload,
			};
		case SET_CREATEQUIZ_ID:
			return {
				...state,
				createQuizId: payload,
			};
		default:
			return state;
	}
};
export default quizReducer;
