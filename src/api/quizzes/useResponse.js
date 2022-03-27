import { useQuery, useMutation } from 'react-query';
import * as fetchers from './responseFetcher';

export const useGetResponse = (userID, questionID) => useQuery(['getResponse', userID, questionID], fetchers.getResponse, {
  retry: 0,
});

export const useGetResponseStatus = (userID, quizID) => useQuery(['getResponse', userID, quizID], fetchers.getResponseStatus, {
  retry: 0,
});

export const useUpdateResponse = () => useMutation(fetchers.updateResponse);
