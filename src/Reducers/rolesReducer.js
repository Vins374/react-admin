import { ROLES_BEGIN, ROLES_ERROR, ROLES, CREATE_ROLES, EDIT_ROLES, DELETE_ROLES, GET_ROLES, GET_ALL_MENUS, GET_ALL_ROLES } from '../Actions/types';

const initialState = {
    data: {},
    type: false,
    loader: false,
    status: false,
    message: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case ROLES:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "ROLES",
                status: action.payload.status,
                message: action.payload.message
            };
        case CREATE_ROLES:
            return {
                ...state,
                data: action.payload,
                loader: false,
                type: "CREATE_ROLES",
                status: action.payload.status,
                message: action.payload.message
            };
        case GET_ROLES:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "GET_ROLES",
                status: action.payload.status,
                message: action.payload.message
            };
        case EDIT_ROLES:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "EDIT_ROLES",
                status: action.payload.status,
                message: action.payload.message
            };
        case GET_ALL_MENUS:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "GET_ALL_MENUS",
                status: action.payload.status,
                message: action.payload.message
            };
        case GET_ALL_ROLES:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "GET_ALL_ROLES",
                status: action.payload.status,
                message: action.payload.message
            };
        case DELETE_ROLES:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "DELETE_ROLES",
                status: action.payload.status,
                message: action.payload.message
            };
        case ROLES_BEGIN:
            return {
                ...state,
                loader: true,
                type: "ROLES_BEGIN",
                message: false
            }
        case ROLES_ERROR:
            return {
                ...state,
                loader: false,
                type: "ROLES_ERROR",
                message: 'Something went wrong'
            }
        default:
            return state;
    }
}