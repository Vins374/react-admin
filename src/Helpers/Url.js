
require('dotenv').config();
// console.log(process.env.REACT_APP_API_URL);

// const baseUrl = "http://localhost:8000/";
const baseUrl = process.env.REACT_APP_API_URL;

const Url = {
    login: baseUrl+'api/login',
    profile: baseUrl+'app-source/profile-images/',
    settings: baseUrl+'api/settings',
    settingsCreate: baseUrl+'api/settings/create',
    settingsDelete: baseUrl+'api/settings/delete',
    getSettingsItem: baseUrl+'api/settings/',
    editSettingsItem: baseUrl+'api/settings/edit',

    menuItems: baseUrl+'api/menu-item',
    createMenuItem: baseUrl+'api/menu-item/create',
    getMenuItem: baseUrl+'api/menu-item/',
    editMenuItem: baseUrl+'api/menu-item/edit',
    deleteMenuItem: baseUrl+'api/menu-item/delete',
    getMainMenu: baseUrl+'api/menu-item/main/menu',
    getAllMenus: baseUrl+'api/menu-item/all/menus',

    roles: baseUrl+'api/roles',
    createRole: baseUrl+'api/roles/create',
    getRole: baseUrl+'api/roles/get/',
    editRole: baseUrl+'api/roles/edit',
    deleteRole: baseUrl+'api/roles/delete',
    getAllRoles: baseUrl+'api/roles/all',

    users: baseUrl+'api/users',
    usersCreate: baseUrl+'api/users/create',
    usersDelete: baseUrl+'api/users/delete',
    getUsersItem: baseUrl+'api/users/get/',
    editUsersItem: baseUrl+'api/users/edit',

    usersLog: baseUrl+'api/users/log',
    usersLogDelete: baseUrl+'api/users/log/delete',

    resetPassword: baseUrl+'api/profile/reset-password',
    getProfile: baseUrl+'api/profile/get',
    profileUpdate: baseUrl+'api/profile/update',

    uploadImage: baseUrl+'api/upload-image/',
    
}

export default Url;