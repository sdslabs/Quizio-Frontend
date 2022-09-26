import { useMutation, useQuery } from 'react-query';
import * as fetchers from './questionFetcher';

export const useAddQuestion = () => useMutation(fetchers.addQuestionToSection);

export const useGetQuestion = (questionID) => useQuery(['getQuestionByID', questionID], fetchers.getQuestionByID, { enabled: !!questionID });

export const useGetQuestionWithAccessCode = (questionID, accessCode) => useQuery(['getQuestionByID', questionID,
accessCode], fetchers.getQuestionByIDWithAccessCode, { enabled: !!questionID });

export const useUpdateQuestion = () => useMutation(fetchers.updateQuestionByID);

export const useDeleteQuestion = () => useMutation(fetchers.deleteQuestionByID);

export const useToggleQuestionType = () => useMutation(fetchers.toggleQuestionType);

export const useAddChoiceToQuestion = () => useMutation(fetchers.addChoiceToQuestion);

export const useDeleteChoiceInQuestion = () => useMutation(fetchers.deleteChoiceInQuestion);

export const useDeleteAllChoicesInQuestion = () => useMutation(fetchers.deleteAllChoicesInQuestion);
