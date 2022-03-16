/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-vars */
import { useQuery, useMutation } from 'react-query';
import * as fetchers from './responseFetcher';

// export const useGetResponse = () => useQuery()

export const useUpdateResponse = () => useMutation(fetchers.updateResponse);
