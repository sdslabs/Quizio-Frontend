import { useMutation, useQuery } from 'react-query';
import * as fetchers from './questionFetcher';

export const useAddQuestion = () => useMutation(fetchers.addQuestionToSection);

export const useGetQuestion = (questionID) => useQuery(['getQuestionByID', questionID], fetchers.getQuestionByID);

export const useUpdateQuestion = () => useMutation(fetchers.updateQuestionByID);

export const useDeleteQuestion = () => useMutation(fetchers.deleteQuestionByID);
