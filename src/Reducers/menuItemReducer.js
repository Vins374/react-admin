import { MENU_ITEMS_BEGIN, MENU_ITEMS_ERROR, MENU_ITEMS, CREATE_MENU_ITEMS, EDIT_MENU_ITEMS, DELETE_MENU_ITEMS, GET_MENU_ITEM, GET_MAIN_MENUS } from '../Actions/types';

const initialState = {
    data: {},
    type: false,
    loader: false,
    status: false,
    message: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case MENU_ITEMS:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "MENU_ITEMS",
                status: action.payload.status,
                message: action.payload.message
            };
        case GET_MAIN_MENUS:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "GET_MAIN_MENUS",
                status: action.payload.status,
                message: action.payload.message
            };
        case CREATE_MENU_ITEMS:
            return {
                ...state,
                data: action.payload,
                loader: false,
                type: "CREATE_MENU_ITEMS",
                status: action.payload.status,
                message: action.payload.message
            };
        case GET_MENU_ITEM:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "GET_MENU_ITEM",
                status: action.payload.status,
                message: action.payload.message
            };
        case EDIT_MENU_ITEMS:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "EDIT_MENU_ITEMS",
                status: action.payload.status,
                message: action.payload.message
            };
        case DELETE_MENU_ITEMS:
            return {
                ...state,
                data: action.payload.data,
                loader: false,
                type: "DELETE_MENU_ITEMS",
                status: action.payload.status,
                message: action.payload.message
            };
        case MENU_ITEMS_BEGIN:
            return {
                ...state,
                loader: true,
                type: "MENU_ITEMS_BEGIN",
                message: false
            }
        case MENU_ITEMS_ERROR:
            return {
                ...state,
                loader: false,
                type: "MENU_ITEMS_ERROR",
                message: 'Something went wrong'
            }
        default:
            return state;
    }
}