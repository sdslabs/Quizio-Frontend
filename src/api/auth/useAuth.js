import Cookies from 'js-cookie';
import { useMutation } from 'react-query';
import * as fetchers from './authFetcher';

export const useLogout = () => {
    Cookies.remove('jwtToken');
};

export const useLoginWithToken = (jwtToken) => useMutation(fetchers.loginWithJwtToken(jwtToken));

export const useCheckAuth = () => useMutation(fetchers.checkAuth);
