import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import * as fetchers from './authFetcher';

export const useLogout = () => useMutation(fetchers.logout);

export const useVerifyToken = () => {
    const { jwtToken } = Cookies.get();
    return useMutation(() => fetchers.verifyToken(jwtToken));
};
