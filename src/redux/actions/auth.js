import {
  SET_IS_LOGGED_IN, SET_USER, SET_JWT_TOKEN, LOG_OUT,
} from '@types/auth';

export const setIsLoggedIn = (isLoggedIn) => ({
  type: SET_IS_LOGGED_IN,
  payload: isLoggedIn,
});
export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});
export const setJwtToken = (token) => ({
  type: SET_JWT_TOKEN,
  payload: token,
});

export const logout = () => ({
  type: LOG_OUT,
});
