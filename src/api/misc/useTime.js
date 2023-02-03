import { useQuery } from 'react-query'
import * as fetchers from './time'

export const useGetCurrentServerTime = () =>
  useQuery('getCurrentServerTime', fetchers.getCurrentServerTime)
