import { SET_IS_LOGGED_IN, SET_USER, SET_JWT_TOKEN, LOG_OUT } from '../actionTypes/authActionTypes'

export const setIsLoggedIn = (isLoggedIn)=>{
    return {
        type:SET_IS_LOGGED_IN,
        payload:isLoggedIn
    }
}
export const setUser = (user) =>{
    return{
        type:SET_USER,
        payload:user
    }
}
export const setJwtToken = (token) =>{
    return {
        type: SET_JWT_TOKEN,
        payload: token 
    }
}

export const logout = ()=>{
    return {
        type:LOG_OUT
    }
}