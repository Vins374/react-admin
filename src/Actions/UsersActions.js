import { USERS_BEGIN, USERS_ERROR, USERS, CREATE_USERS, EDIT_USERS, DELETE_USERS, USERS_ITEM } from './types';
import Url from '../Helpers/Url'
import { getToken } from '../Helpers/Session'

export const getDataItems = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.users, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: USERS,
        payload: data
    }))
    .catch(function(e) {
        console.log(e.message);
        dispatch(error());
    });
}

export const createItem = (data) =>dispatch => {
    dispatch(begin());
    fetch(Url.usersCreate, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: CREATE_USERS,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const getItem = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.getUsersItem+data, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        }
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: USERS_ITEM,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const editItem = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.editUsersItem, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: EDIT_USERS,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const deleteItem = (data => dispatch => {
    dispatch(begin());
    fetch(Url.usersDelete, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: DELETE_USERS,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
});

export const begin = () => dispatch => {
    dispatch({type: USERS_BEGIN});
}

export const error = () => dispatch => {
    dispatch({type: USERS_ERROR});
}