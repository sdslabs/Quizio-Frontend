/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { useQuery, useMutation } from 'react-query';
import * as fetchers from './scoreFetcher';

export const useGetScore = () => useQuery('getScore', fetchers.getScore);

export const useUpdateScore = () => useMutation(fetchers.updateScore);
