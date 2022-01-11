import { combineReducers } from 'redux';
import authReducer from '@reducers/auth';
import quizReducer from '@reducers/quiz';

const rootReducer = combineReducers({
	auth: authReducer,
	quiz: quizReducer,
});

export default rootReducer;
