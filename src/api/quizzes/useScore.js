import { useQuery, useMutation } from 'react-query';
import * as fetchers from './scoreFetcher';

export const useGetScore = (questionID, registrantID) => useQuery(['getScore',
	questionID, registrantID], fetchers.getScore, { enabled: !!questionID });

export const useUpdateScore = () => useMutation(fetchers.updateScore);
