import {
	SET_CREATEQUIZ_ID,
	SET_CREATEQUIZ_STAGE,
} from '@types/quiz';

export const setCreateQuizStage = (stage) => ({
	type: SET_CREATEQUIZ_STAGE,
	payload: stage,
});

export const setCreateQuizId = (quizId) => ({
	type: SET_CREATEQUIZ_ID,
	payload: quizId,
});
