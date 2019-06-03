import { UPLOAD_IMAGE, PROFILE_BEGIN, PROFILE_ERROR, PROFILE_GET, PROFILE_UPDATE, PROFILE_RESET_PASSWORD } from './types';
import Url from '../Helpers/Url'
import { getToken } from '../Helpers/Session'

export const resetPassword = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.resetPassword, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: PROFILE_RESET_PASSWORD,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const uploadImage = (type,data) => dispatch => {
    dispatch(begin());
    fetch(Url.uploadImage+type, {
        method: 'POST',
        headers: {
            // 'content-type': 'application/json',
            'token': getToken()
        },
        body: data
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: UPLOAD_IMAGE,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const getProfile = () => dispatch => {
    dispatch(begin());
    fetch(Url.getProfile, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        }
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: PROFILE_GET,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const updateProfile = (data) => dispatch => {
    dispatch(begin());
    fetch(Url.profileUpdate, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'token': getToken()
        },
        body: JSON.stringify(data)
    })
    .then(res =>res.json())
    .then(data=>dispatch({
        type: PROFILE_UPDATE,
        payload: data
    }))
    .catch(function() {
        dispatch(error());
    });
}

export const begin = () => dispatch => {
    dispatch({type: PROFILE_BEGIN});
}

export const error = () => dispatch => {
    dispatch({type: PROFILE_ERROR});
}