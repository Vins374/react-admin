import React, { Fragment, Component } from 'react';
import { withStyles, Card, CardActions, CardContent, Button, Grid, Typography, TextField, FormControl, CircularProgress } from '@material-ui/core';

import compose from 'recompose/compose';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

import { pageAccessPermission } from './../../../Helpers/Session';
import AccessDenied from './../../AccessDenied';
import { editItem, getSingleItem } from './../../../Actions/RolesActions';
import { Loader, Notification } from './../../Common';
import { AppHeader, MenuBar } from '../../Layout';
import classes from './classes';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ReactNotification from "react-notifications-component";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class RolesEdit extends Component {
    constructor(props) {
        super(props);
        const { match: { params } } = props;
        this.state = {
            role_name:'',
            menu_list:[],
            role_id: params.id
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.backToIndex = this.backToIndex.bind(this);
        this.changePermission = this.changePermission.bind(this);
        this.notificationDOMRef = React.createRef();

        this.props.getSingleItem(params.id);
    }

    onSubmit(e) {
        const payload = { role_id: this.state.role_id, role_name: this.state.role_name, menu_list: this.state.menu_list };
        this.props.editItem(payload);
        e.persist();
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type == 'GET_ROLES') {
            if(nextProps.status)
                this.setState({ menu_list: nextProps.data.menu_list, role_name: nextProps.data.role_name})
        }

        if(nextProps.type == 'EDIT_ROLES') {
            if(nextProps.status)
            this.props.history.push("/tadmin/user-administration/roles");
        }

        if(nextProps.message)
            if(nextProps.message == 'Invalid token')
                this.props.history.push("/tadmin/logout");
    }

    backToIndex() {
        this.props.history.push("/tadmin/user-administration/roles");
    }

    changePermission(key,type,e) {
        let updateValue = e.target.checked ? true : false;
        this.setState({
            menu_list: this.state.menu_list.map((menu, index) => {
              if (index === key) {
                  if(type == 'read') {
                    return {
                        ...menu,
                        permission_read: updateValue
                      };
                  }
                  else if(type == 'write') {
                    return {
                        ...menu,
                        permission_write: updateValue
                      };
                  }
                  else if(type == 'delete') {
                    return {
                        ...menu,
                        permission_delete: updateValue
                      };
                  }
                
              }
              return menu;
            })
          });
    }

    render() {
        const { classes, loader, message, status, data } = this.props;
        const { role_name, menu_list } = this.state;
        const bull = <span className={classes.bullet}>•</span>;

        if(pageAccessPermission(this.props.location,'edit')) {
            return (
                <Fragment>
                    <AppHeader />
                    
                    <Card className={classes.card}>
                        <CardContent>
                        <ValidatorForm
                                ref="form"
                                onSubmit={this.onSubmit}
                            >
                        <Grid container spacing={16}>
                            <Grid item xs={10}>
                                <Typography variant="h5" gutterBottom className="margin-b-25">
                                    Roles / Edit
                                </Typography>
                            </Grid>
                            <Grid item xs={2} className="text-a-c">
                                <Button type="submit" variant="contained" color="primary" className="padding-15 margin-r-5"> <i className="fa fa-save"></i> </Button>   
                                <Button type="button" onClick={this.backToIndex} variant="contained" className="padding-15"> <i className="fa fa-reply"></i> </Button>
                            </Grid>
                        </Grid>

                        <Grid container spacing={16}>
                            <Grid  item xs={4}>
                                <FormControl fullWidth>
                                <TextValidator
                                    className="margin-b-35"
                                    label="Role Name"
                                    onChange={this.handleChange}
                                    name="role_name"
                                    value={role_name}
                                    validators={['required']}
                                    autoFocus
                                    errorMessages={['this field is required']}
                                />
                                </FormControl>
                                
                                <FormControl fullWidth>
                                
                                </FormControl>
                            </Grid>

                            <Grid  item xs={12}>
                            <Table className={classes.table}>
                                <TableHead>
                                <TableRow>
                                    <TableCell> S.No </TableCell>
                                    <TableCell> Menu Name </TableCell>
                                    <TableCell align="right"> Read </TableCell>
                                    <TableCell align="right"> Write </TableCell>
                                    <TableCell align="right"> Delete </TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {menu_list.map((menu, key) => (
                                    <TableRow key={menu.admin_menu_id}>
                                    <TableCell component="th" scope="row">
                                        {menu.admin_menu_id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {menu.menu_name}
                                    </TableCell>
                                    <TableCell align="right">

                                    <input 
                                            type="checkbox" name={'permissionRead'+key} id={'permissionRead'+key} 
                                            onChange={(e) => this.changePermission(key,'read', e)}
                                            defaultChecked={menu.permission_read}
                                    />

                                    </TableCell>
                                    <TableCell align="right"> 
                                    
                                    <input 
                                            type="checkbox" 
                                            name={'permissionWrite'+key} 
                                            onChange={(e) => this.changePermission(key,'write', e)}
                                            defaultChecked={menu.permission_write}
                                    />

                                    </TableCell>
                                    <TableCell align="right"> 
                                    
                                    <input 
                                            type="checkbox" 
                                            name={'permissionDelete'+key} 
                                            onChange={(e) => this.changePermission(key,'delete', e)}
                                            defaultChecked={menu.permission_delete}
                                    />

                                    </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                            </Grid>
                        </Grid>

                        </ValidatorForm>

                        { loader && <CircularProgress className={classes.progress} /> }

                        { message && <Notification type={status} message={message} elementRef={this.notificationDOMRef} /> }

                        <ReactNotification ref={this.notificationDOMRef} />

                        </CardContent>
                        </Card>

                </Fragment>
            )
        }
        else {
            return (
                <AccessDenied />
            )
        }
    }
}

RolesEdit.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    data: state.roles.data,
    loader: state.roles.loader,
    message: state.roles.message,
    status: state.roles.status,
    type: state.roles.type
});

export default compose(
    withStyles(classes),
    connect(mapStateToProps, { editItem, getSingleItem })
  )(RolesEdit);