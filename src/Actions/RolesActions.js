import { ROLES_BEGIN, ROLES_ERROR, ROLES, CREATE_ROLES, EDIT_ROLES, DELETE_ROLES, GET_ROLES, GET_ALL_MENUS, GET_ALL_ROLES } from './types';
import Url from '../Helpers/Url'
import { getToken } from '../Helpers/Session'

export const getDataItems = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.roles, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: ROLES,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const getAllMenus = () =>dispatch => {
    dispatch(begin());
    fetch(Url.getAllMenus, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: GET_ALL_MENUS,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const getAllRoles = () =>dispatch => {
    dispatch(begin());
    fetch(Url.getAllRoles, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: GET_ALL_ROLES,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const createItem = (data) =>dispatch => {
    dispatch(begin());
    fetch(Url.createRole, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: CREATE_ROLES,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const getSingleItem = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.getRole+data, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        }
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: GET_ROLES,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const editItem = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.editRole, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: EDIT_ROLES,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const deleteItem = (data => dispatch => {
    dispatch(begin());
    fetch(Url.deleteRole, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: DELETE_ROLES,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
});

export const begin = () => dispatch => {
    dispatch({type: ROLES_BEGIN});
}

export const error = () => dispatch => {
    dispatch({type: ROLES_ERROR});
}