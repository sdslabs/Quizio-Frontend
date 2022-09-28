/* eslint-disable import/prefer-default-export */
import { useMutation } from 'react-query';
import * as fetchers from './logsFetcher';

export const useUpdateLogs = () => useMutation(fetchers.updateLogs);
