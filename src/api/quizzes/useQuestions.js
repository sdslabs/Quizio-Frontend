import { useMutation, useQuery } from 'react-query';
import * as fetchers from './questionFetcher';

export const useAddQuestion = () => useMutation(fetchers.addQuestionToSection);

export const useGetQuestion = (questionId) => useQuery(['getQuestionById', questionId], fetchers.getQuestionById);

export const useUpdateQuestion = () => useMutation(fetchers.updateQuestionById);

export const useDeleteQuestion = () => useMutation(fetchers.deleteQuestionById);
