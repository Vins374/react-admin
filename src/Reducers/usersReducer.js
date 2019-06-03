import { USERS_BEGIN, USERS_ERROR, USERS, CREATE_USERS, EDIT_USERS, DELETE_USERS, USERS_ITEM } from '../Actions/types';

const initialState = {
    data: {},
    type: false,
    loader: false,
    status: false,
    message: '',
    pages: false
};

export default function(state = initialState, action) {
    switch(action.type) {
        case USERS:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "USERS",
                status: action.payload.status,
                message: action.payload.message
            };
        case CREATE_USERS:
            return {
                ...state,
                data: action.payload,
                loader: false,
                type: "CREATE_USERS",
                status: action.payload.status,
                message: action.payload.message
            };
        case USERS_ITEM:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "USERS_ITEM",
                status: action.payload.status,
                message: action.payload.message
            };
        case EDIT_USERS:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "EDIT_USERS",
                status: action.payload.status,
                message: action.payload.message
            };
        case DELETE_USERS:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "DELETE_USERS",
                status: action.payload.status,
                message: action.payload.message
            };
        case USERS_BEGIN:
            return {
                ...state,
                loader: true,
                type: "USERS_BEGIN",
                message: false
            }
        case USERS_ERROR:
            return {
                ...state,
                loader: false,
                type: "USERS_ERROR",
                message: 'Something went wrong'
            }
        default:
            return state;
    }
}