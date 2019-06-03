import { UPLOAD_IMAGE, PROFILE_BEGIN, PROFILE_ERROR, PROFILE_GET, PROFILE_UPDATE, PROFILE_RESET_PASSWORD } from '../Actions/types';

const initialState = {
    data: {},
    type: false,
    loader: false,
    status: false,
    message: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case PROFILE_UPDATE:
            return {
                ...state,
                data: action.payload.data,
                pages: action.payload.data.pages,
                loader: false,
                type: "PROFILE_UPDATE",
                status: action.payload.status,
                message: action.payload.message
            };
        case UPLOAD_IMAGE:
            return {
                ...state,
                data: action.payload.data,
                pages: action.payload.data.pages,
                loader: false,
                type: "UPLOAD_IMAGE",
                status: action.payload.status,
                message: action.payload.message
            };
        case PROFILE_GET:
            return {
                ...state,
                data: action.payload.data,
                pages: action.payload.data.pages,
                loader: false,
                type: "PROFILE_GET",
                status: action.payload.status,
                message: action.payload.message
            };
        case PROFILE_RESET_PASSWORD:
            return {
                ...state,
                data: action.payload.data,
                pages: action.payload.data.pages,
                loader: false,
                type: "PROFILE_RESET_PASSWORD",
                status: action.payload.status,
                message: action.payload.message
            };
        case PROFILE_BEGIN:
            return {
                ...state,
                loader: true,
                type: "PROFILE_BEGIN",
                message: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                loader: false,
                type: "PROFILE_ERROR",
                message: 'Something went wrong'
            }
        default:
            return state;
    }
}