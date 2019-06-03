import { USER_LOGIN,USER_LOGIN_BEGIN,USER_LOGIN_ERROR,LOGOUT } from '../Actions/types';

import { USER_REGISTER,USER_REGISTER_BEGIN,USER_REGISTER_ERROR } from '../Actions/types';

const initialState = {
    registerData: {},
    loginData: {},
    loader: false,
    status: false,
    message: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOGIN:
            return {
                ...state,
                loginData: action.payload,
                loader: false,
                status: action.payload.status,
                type: "USER_LOGIN",
                message: action.payload.message
            };
        case LOGOUT:
            return {
                ...state,
                status: false,
                loader: false,
                type: "LOGOUT",
                message: false
            }
        case USER_REGISTER:
            return {
                ...state,
                loader: false,
                registerData: action.payload,
                status: action.payload.status,
                type: "USER_REGISTER",
                message: action.payload.message
            };
        case USER_LOGIN_BEGIN:
            return {
                ...state,
                loader: true,
                type: "USER_LOGIN_BEGIN",
                message: false
            }
        case USER_LOGIN_ERROR:
            return {
                ...state,
                loader: false,
                type: "USER_LOGIN_ERROR",
                message: 'Something went wrong'
            }
        case USER_REGISTER_BEGIN:
            return {
                ...state,
                loader: true,
                type: "USER_REGISTER_BEGIN",
                message: false
            }
        case USER_REGISTER_ERROR:
            return {
                ...state,
                loader: false,
                type: "USER_REGISTER_ERROR",
                message: 'Something went wrong'
            }
        default:
            return state;
    }
}