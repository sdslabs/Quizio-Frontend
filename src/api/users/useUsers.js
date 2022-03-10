import { useQuery } from 'react-query';
import * as fetchers from './usersFetcher';

export const useGetAllUsers = () => useQuery(['getAllUsers'], fetchers.getAllUsers);

export const useGetUserDetails = (username) => useQuery(['getUserDetails', username], fetchers.getUserDetails);

export const useGetMyQuizzes = () => useQuery(['getMyQuizzes'], fetchers.getMyQuizzes);

export const useCheckIfEmailExists = (emailID) => useQuery(['checkIfEmailExists', emailID], fetchers.checkIfEmailExists);
