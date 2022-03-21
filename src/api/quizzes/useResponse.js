import { useQuery, useMutation } from 'react-query';
import * as fetchers from './responseFetcher';

export const useGetResponse = (userID, questionID) => useQuery(['getResponse', userID, questionID], fetchers.getResponse);

export const useGetResponseStatus = (userID, quizID) => useQuery(['getResponse', userID, quizID], fetchers.getResponseStatus);

export const useUpdateResponse = () => useMutation(fetchers.updateResponse);
