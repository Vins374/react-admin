import { USERS_LOG_BEGIN, USERS_LOG_ERROR, USERS_LOG, USERS_LOG_DELETE } from './types';
import Url from '../Helpers/Url'
import { getToken } from '../Helpers/Session'

export const getDataItems = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.usersLog, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: USERS_LOG,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const deleteItem = (data => dispatch => {
    dispatch(begin());
    fetch(Url.usersLogDelete, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: USERS_LOG_DELETE,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
});

export const begin = () => dispatch => {
    dispatch({type: USERS_LOG_BEGIN});
}

export const error = () => dispatch => {
    dispatch({type: USERS_LOG_ERROR});
}