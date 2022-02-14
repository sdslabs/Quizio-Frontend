import { useQuery, useMutation } from 'react-query';
import * as fetchers from './quizzesFetcher';

export const useCreateQuiz = () => useMutation(fetchers.createNewQuiz);

export const useGetAllQuizzes = () => useQuery('getAllQuizzes', fetchers.getAllQuizzes);

export const useUpdateQuiz = () => useMutation(fetchers.updateQuizById);

export const useDeleteQuiz = () => useMutation(fetchers.deleteQuizById);

export const useGetQuiz = (quizId) => useQuery(['getQuizDetails', quizId], fetchers.getQuizById, { enabled: !!quizId });
