import { USERS_LOG_BEGIN, USERS_LOG_ERROR, USERS_LOG, USERS_LOG_DELETE } from '../Actions/types';

const initialState = {
    data: {},
    type: false,
    loader: false,
    status: false,
    message: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case USERS_LOG:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "USERS_LOG",
                status: action.payload.status,
                message: action.payload.message
            };
        case USERS_LOG_DELETE:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "USERS_LOG_DELETE",
                status: action.payload.status,
                message: action.payload.message
            };
        case USERS_LOG_BEGIN:
            return {
                ...state,
                loader: true,
                type: "USERS_LOG_BEGIN",
                message: false
            }
        case USERS_LOG_ERROR:
            return {
                ...state,
                loader: false,
                type: "USERS_LOG_ERROR",
                message: 'Something went wrong'
            }
        default:
            return state;
    }
}