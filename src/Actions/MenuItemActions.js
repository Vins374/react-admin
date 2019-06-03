import { MENU_ITEMS_BEGIN, MENU_ITEMS_ERROR, MENU_ITEMS, CREATE_MENU_ITEMS, EDIT_MENU_ITEMS, DELETE_MENU_ITEMS, GET_MENU_ITEM, GET_MAIN_MENUS } from './types';
import Url from '../Helpers/Url'
import { getToken } from '../Helpers/Session'

export const getDataItems = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.menuItems, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: MENU_ITEMS,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const getMainMenu = () =>dispatch => {
    dispatch(begin());
    fetch(Url.getMainMenu, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: GET_MAIN_MENUS,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const createItem = (data) =>dispatch => {
    dispatch(begin());
    fetch(Url.createMenuItem, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: CREATE_MENU_ITEMS,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const getSingleItem = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.getMenuItem+data, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        }
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: GET_MENU_ITEM,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const editItem = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.editMenuItem, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: EDIT_MENU_ITEMS,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const deleteItem = (data => dispatch => {
    dispatch(begin());
    fetch(Url.deleteMenuItem, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: DELETE_MENU_ITEMS,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
});

export const begin = () => dispatch => {
    dispatch({type: MENU_ITEMS_BEGIN});
}

export const error = () => dispatch => {
    dispatch({type: MENU_ITEMS_ERROR});
}