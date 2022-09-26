import { useQuery, useMutation } from 'react-query';
import * as fetchers from './quizzesFetcher';

export const useCreateQuiz = () => useMutation(fetchers.createNewQuiz);

export const useGetAllQuizzes = () => useQuery('getAllQuizzes', fetchers.getAllQuizzes);

export const useGetQuiz = (quizID) => useQuery(['getQuizDetails', quizID], fetchers.getQuizByID, { enabled: !!quizID });

export const useUpdateQuiz = () => useMutation(fetchers.updateQuizByID);

export const useDeleteQuiz = () => useMutation(fetchers.deleteQuizByID);

export const useSubmitQuiz = () => useMutation(fetchers.submitQuizByID);

export const useCheckIfQuizIsSubmitted = (quizID) => useQuery(
	[`isSubmittedQuiz-${quizID}`, quizID],
	fetchers.checkIfQuizIsSubmitted,
	{ enabled: !!quizID },
);

export const useGetRankList = (quizID) => useQuery(['getQuizRankList', quizID], fetchers.getQuizRankList);
export const useGenerateRanks = (quizID) => useMutation(['getRanks', quizID], fetchers.generateRanklist);

export const useGetQuizzesCreatedByUser = () => useQuery(['getQuizzesCreatedByUser'], fetchers.getQuizzesCreatedByUser);
