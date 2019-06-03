import { CREATE_SETTINGS, EDIT_SETTINGS, DELETE_SETTINGS, SETTINGS_ITEM, SETTINGS, SETTINGS_BEGIN, SETTINGS_ERROR } from '../Actions/types';

const initialState = {
    data: {},
    type: false,
    loader: false,
    status: false,
    message: '',
    pages: null
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SETTINGS:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "SETTINGS",
                status: action.payload.status,
                message: action.payload.message
            };
        case CREATE_SETTINGS:
            return {
                ...state,
                data: action.payload,
                loader: false,
                type: "CREATE_SETTINGS",
                status: action.payload.status,
                message: action.payload.message
            };
        case SETTINGS_ITEM:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "SETTINGS_ITEM",
                status: action.payload.status,
                message: action.payload.message
            };
        case EDIT_SETTINGS:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "EDIT_SETTINGS",
                status: action.payload.status,
                message: action.payload.message
            };
        case DELETE_SETTINGS:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "DELETE_SETTINGS",
                status: action.payload.status,
                message: action.payload.message
            };
        case SETTINGS_BEGIN:
            return {
                ...state,
                loader: true,
                type: "SETTINGS_BEGIN",
                message: false
            }
        case SETTINGS_ERROR:
            return {
                ...state,
                loader: false,
                type: "SETTINGS_ERROR",
                message: 'Something went wrong'
            }
        default:
            return state;
    }
}