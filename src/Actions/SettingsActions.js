import { CREATE_SETTINGS, EDIT_SETTINGS, DELETE_SETTINGS, SETTINGS_ITEM, SETTINGS, SETTINGS_BEGIN, SETTINGS_ERROR } from './types';
import Url from '../Helpers/Url'
import { getToken } from '../Helpers/Session'

export const getSettings = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.settings, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: SETTINGS,
        payload: data
    }))
    .catch(function(e) {
        // console.log(e.message);
        dispatch(error());
    });
}

export const createSettings = (data) =>dispatch => {
    dispatch(begin());
    fetch(Url.settingsCreate, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: CREATE_SETTINGS,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const getSettingsItem = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.getSettingsItem+data, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        }
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: SETTINGS_ITEM,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const editSettingsItem = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.editSettingsItem, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: EDIT_SETTINGS,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const deleteSettings = (data => dispatch => {
    dispatch(begin());
    fetch(Url.settingsDelete, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: DELETE_SETTINGS,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
});

export const begin = () => dispatch => {
    dispatch({type: SETTINGS_BEGIN});
}

export const error = () => dispatch => {
    dispatch({type: SETTINGS_ERROR});
}