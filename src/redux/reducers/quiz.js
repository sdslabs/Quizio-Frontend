import {
	SET_CREATEQUIZ_STAGE,
} from '@types/quiz';

const initialState = {
	createQuizStage: 'Quiz Details',
};

const quizReducer = (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_CREATEQUIZ_STAGE:
			return {
				...state,
				createQuizStage: payload,
			};
		default:
			return state;
	}
};
export default quizReducer;
