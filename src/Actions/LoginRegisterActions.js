import { USER_REGISTER, USER_REGISTER_BEGIN, USER_REGISTER_ERROR } from './types';
import { USER_LOGIN,USER_LOGIN_BEGIN,USER_LOGIN_ERROR,LOGOUT } from './types';
import Url from '../Helpers/Url'

export const loginUser = (userData) => dispatch => {
    dispatch(beginLogin());
    fetch(Url.login, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res =>res.json())
        .then(user=>dispatch({
            type: USER_LOGIN,
            payload: user
        }))
        .catch(function() {
            dispatch(errorLogin());
        });
}

export const logout = () => dispatch => {
    dispatch({type: LOGOUT});
}

export const beginLogin = () => dispatch => {
    dispatch({type: USER_LOGIN_BEGIN});
}

export const errorLogin = () => dispatch => {
    dispatch({type: USER_LOGIN_ERROR});
}


export const registerUser = (userData) => dispatch => {
    dispatch(beginRegister());
    fetch('http://localhost/react-demo-php/register.php', {    
        // fetch('http://app-shoppe.alapatt.co:3000/user/login', { 
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(res =>res.json())
        .then(user=>dispatch({
            type: USER_REGISTER,
            payload: user
        }))
        .catch(function() {
            dispatch(errorLogin());
        });
}

export const beginRegister = () => dispatch => {
    dispatch({type: USER_REGISTER_BEGIN});
}

export const errorRegister = () => dispatch => {
    dispatch({type: USER_REGISTER_ERROR});
}