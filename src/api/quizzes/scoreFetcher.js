import axiosInstance from '@api/axiosInstance';

// eslint-disable-next-line import/prefer-default-export
export const getScore = ({ queryKey }) => {
    // console.log(queryKey, 'queryKey');
    axiosInstance.get(`/quizzes/sections/questions/${queryKey[1]}/${queryKey[2]}/check`);
};

export const updateScore = ({ questionID, body }) => axiosInstance.put(`/quizzes/sections/questions/${questionID}/check`, body);
