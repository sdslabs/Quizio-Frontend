import Cookies from 'universal-cookie';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,

    LOGIN_SUCCESS,
    LOGIN_FAIL,

    LOGOUT,

    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR
} from '../actions/types';

const cookies = new Cookies();

const initialState = {
    token: cookies.get('token'),
    sdslabs: cookies.get('sdslabs'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default (state = initialState, action) => {

    switch (action.type) {

        case REGISTER_SUCCESS:

        case REGISTER_FAIL:

        case LOGIN_SUCCESS:
            cookies.set('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case LOGIN_FAIL:

        case LOGOUT:
            cookies.remove('token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };

        case AUTH_ERROR:

        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };

        default:
            return state;
    }
}