import { useQuery, useMutation } from 'react-query';
import * as fetchers from './responseFetcher';

export const useGetResponse = (userID, questionID) => useQuery(['getResponse', userID, questionID], fetchers.getResponse);

export const useGetStatus = (userID, quizID) => useQuery(['getResponse', userID, quizID], fetchers.getStatus);

export const useUpdateResponse = () => useMutation(fetchers.updateResponse);
