import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Error404 from './Error404';
import DashboardIndex from './App/Dashboard/DashboardIndex';
import SettingsIndex from './App/Settings/SettingsIndex';
import SettingsCreate from './App/Settings/SettingsCreate';
import SettingsEdit from './App/Settings/SettingsEdit';

import MenuItemIndex from './App/MenuItems/MenuItemIndex';
import MenuItemCreate from './App/MenuItems/MenuItemCreate';
import MenuItemEdit from './App/MenuItems/MenuItemEdit';

import RolesIndex from './App/Roles/RolesIndex';
import RolesCreate from './App/Roles/RolesCreate';
import RolesEdit from './App/Roles/RolesEdit';

import UsersIndex from './App/Users/UsersIndex';
import UsersCreate from './App/Users/UsersCreate';
import UsersEdit from './App/Users/UsersEdit';

import UsersLogIndex from './App/UsersLog/UsersLogIndex';

import ProfileIndex from './App/Profile/ProfileIndex';
import ProfileResetPassword from './App/Profile/ProfileResetPassword';

import Logout from './App/Logout';
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();   

class Routes extends Component {
   render() {
      return (
        <div>
            <Router history={history}>
            {/* <Router history={history} basename={'/react-new/react-material-ui/build'}> */}
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />

                <Route exact path='/tadmin/dashboard' component={DashboardIndex} />
                <Route exact path='/tadmin/system/settings' component={SettingsIndex} />
                <Route exact path='/tadmin/system/settings/create' component={SettingsCreate} />
                <Route exact path='/tadmin/system/settings/edit/:id' component={SettingsEdit} />

                <Route exact path='/tadmin/system/menu-items' component={MenuItemIndex} />
                <Route exact path='/tadmin/system/menu-items/create' component={MenuItemCreate} />
                <Route exact path='/tadmin/system/menu-items/edit/:id' component={MenuItemEdit} />

                <Route exact path='/tadmin/user-administration/roles' component={RolesIndex} />
                <Route exact path='/tadmin/user-administration/roles/create' component={RolesCreate} />
                <Route exact path='/tadmin/user-administration/roles/edit/:id' component={RolesEdit} />

                <Route exact path='/tadmin/user-administration/users' component={UsersIndex} />
                <Route exact path='/tadmin/user-administration/users/create' component={UsersCreate} />
                <Route exact path='/tadmin/user-administration/users/edit/:id' component={UsersEdit} />

                <Route exact path='/tadmin/user-administration/user-log' component={UsersLogIndex} />

                
                <Route exact path='/tadmin/profile' component={ProfileIndex} />
                <Route exact path='/tadmin/reset-password' component={ProfileResetPassword} />

                <Route exact path='/tadmin/logout' component={Logout} />
                <Route path="*" component={Error404} />

            </Switch>
            </Router>
        </div>
      );
   }
}
export default Routes;