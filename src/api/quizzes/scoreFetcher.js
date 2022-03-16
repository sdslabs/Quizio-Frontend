import axiosInstance from '@api/axiosInstance';
import log from '@utils/log';

// eslint-disable-next-line import/prefer-default-export
export const getScore = ({ queryKey }) => {
	log('get score: ', { queryKey });
	axiosInstance.get(`/quizzes/sections/questions/${queryKey[1]}/${queryKey[2]}/check`);
};

export const updateScore = ({ questionID, body }) => axiosInstance.put(`/quizzes/sections/questions/${questionID}/check`, body);
