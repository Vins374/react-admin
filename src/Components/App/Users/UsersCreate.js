import React, { Fragment, Component } from 'react';
import { withStyles, Card, CardActions, CardContent, Button, Grid, Typography, TextField, FormControl, CircularProgress, Select, MenuItem, FormHelperText } from '@material-ui/core';

import compose from 'recompose/compose';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

import { pageAccessPermission } from './../../../Helpers/Session';
import AccessDenied from './../../AccessDenied';
import { createItem } from './../../../Actions/UsersActions';
import { getAllRoles } from './../../../Actions/RolesActions';
import { Loader, Notification } from './../../Common';
import { AppHeader, MenuBar } from '../../Layout';
import classes from './classes';

import ReactNotification from "react-notifications-component";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


class UsersCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name:'',
            email:'',
            mobile:'',
            username:'',
            password:'',
            role_id:'',
            roleList: [],
            user_status: 1
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.backToIndex = this.backToIndex.bind(this);
        this.notificationDOMRef = React.createRef();

        this.props.getAllRoles();
    }

    onSubmit(e) {
        const payload = { 
                            full_name: this.state.full_name, 
                            email: this.state.email, 
                            mobile: this.state.mobile,
                            username: this.state.username, 
                            password: this.state.password, 
                            role_id: this.state.role_id,
                            status: this.state.user_status
                        };
        this.props.createItem(payload);
        e.persist();
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type == 'CREATE_USERS') {
            if(nextProps.status)
                this.props.history.push("/tadmin/user-administration/users");
        }

        if(nextProps.roleType == 'GET_ALL_ROLES') {
            if(nextProps.roleStatus)
                this.setState({ roleList: nextProps.roleData });
        }

        if(nextProps.roleMessage)
            if(nextProps.roleMessage == 'Invalid token')
                this.props.history.push("/tadmin/logout");
    }

    backToIndex() {
        this.props.history.push("/tadmin/user-administration/users");
    }

    render() {
        const { classes, loader, message, status, data } = this.props;
        const { role_id, full_name, email, mobile, username, password, roleList, user_status } = this.state;
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
                                    Users / Create
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
                                    label="Full Name"
                                    onChange={this.handleChange}
                                    name="full_name"
                                    value={full_name}
                                    validators={['required']}
                                    autoFocus
                                    errorMessages={['this field is required']}
                                />
                                </FormControl>
                                
                                <FormControl fullWidth>
                                <TextValidator
                                    className="margin-b-35"
                                    label="Email"
                                    onChange={this.handleChange}
                                    name="email"
                                    value={email}
                                />
                                </FormControl>

                                <FormControl fullWidth>
                                <TextValidator
                                    className="margin-b-35"
                                    label="Mobile"
                                    onChange={this.handleChange}
                                    name="mobile"
                                    value={mobile}
                                />
                                </FormControl>

                                <FormControl fullWidth>
                                <TextValidator
                                    className="margin-b-35"
                                    label="Username"
                                    onChange={this.handleChange}
                                    name="username"
                                    value={username}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                </FormControl>

                                <FormControl fullWidth>
                                <TextValidator
                                    className="margin-b-35"
                                    type="password"
                                    label="Password"
                                    onChange={this.handleChange}
                                    name="password"
                                    value={password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                </FormControl>

                                <FormControl fullWidth>
                                <Select
                                    value={role_id}
                                    onChange={this.handleChange}
                                    name="role_id"
                                >

                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    
                                    { roleList.map((role, key) => <MenuItem key={key} value={role.role_id}> {role.role_name} </MenuItem>)} 

                                </Select>
                                <FormHelperText className="margin-b-35"> Role </FormHelperText>
                                </FormControl>

                                <FormControl fullWidth>
                                <Select
                                    value={user_status}
                                    onChange={this.handleChange}
                                    name="user_status"
                                >
                                    <MenuItem value={1}>Enabled</MenuItem>
                                    <MenuItem value={0}>Disabled</MenuItem>
                                </Select>
                                <FormHelperText className="margin-b-35">Status</FormHelperText>
                                </FormControl>


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

UsersCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    data: state.users.data,
    loader: state.users.loader,
    message: state.users.message,
    status: state.users.status,
    type: state.users.type,
    roleData: state.roles.data,
    roleType: state.roles.type,
    roleStatus: state.roles.status,
    roleMessage: state.roles.message
});

export default compose(
    withStyles(classes),
    connect(mapStateToProps, { createItem, getAllRoles })
  )(UsersCreate);