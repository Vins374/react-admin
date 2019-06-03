import { combineReducers } from 'redux';
import userRegisterReducer from './userRegisterReducer';
import settingsReducer from './settingsReducer';
import menuItemReducer from './menuItemReducer';
import rolesReducer from './rolesReducer';
import usersReducer from './usersReducer';
import usersLogReducer from './usersLogReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    user: userRegisterReducer,
    settings: settingsReducer,
    menuItem: menuItemReducer,
    roles: rolesReducer,
    users: usersReducer,
    usersLog: usersLogReducer,
    profile: profileReducer,
});