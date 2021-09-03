import { SET_IS_LOGGED_IN, SET_USER, SET_JWT_TOKEN, LOG_OUT } from '../actionTypes/authActionTypes'

const initialState = {
    isLoggedIn:false,
    token:"",
    user:{}
}


const authReducer = (state = initialState, action) =>{
    const { type, payload } = action;
    switch (type) {
        case SET_IS_LOGGED_IN:
            return{
                ...state ,
                isLoggedIn: payload
            }
            break;
        case SET_USER:
            return{
                ...state ,
                user: payload,
                isLoggedIn: true
            }
            break;
        case SET_JWT_TOKEN:
            return {
                ...state,
                token: payload
            }
        case LOG_OUT:
            return {
                ...state,
                isLoggedIn:false,
                token:"",
                user:{}
            }
        default:
            return initialState;
    }

}

export default authReducer;