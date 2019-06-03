import React, { Fragment, Component } from 'react';
import { withStyles, Card, CardActions, CardContent, Button, Grid, Typography, TextField, FormControl, CircularProgress, Select, MenuItem, FormHelperText } from '@material-ui/core';

import compose from 'recompose/compose';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

import { getLoginData } from './../../../Helpers/Session';
import AccessDenied from './../../AccessDenied';
import { getProfile, updateProfile, uploadImage } from './../../../Actions/ProfileActions';
import { Loader, Notification } from './../../Common';
import { AppHeader, MenuBar } from '../../Layout';
import classes from './classes';
import Url from './../../../Helpers/Url';

import ReactNotification from "react-notifications-component";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


class ProfileIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name:'',
            email:'',
            mobile:'',
            username:'',
            profile_image:'default.png',
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.backToIndex = this.backToIndex.bind(this);
        this.notificationDOMRef = React.createRef();
        this.fileChangedHandler = this.fileChangedHandler.bind(this);

        let userData= getLoginData();

        this.props.getProfile();
    }

    onSubmit(e) {
        const payload = { 
                            full_name: this.state.full_name, 
                            email: this.state.email, 
                            mobile: this.state.mobile,
                            username: this.state.username,
                            profile_image: this.state.profile_image
                        };

        this.props.updateProfile(payload);
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

        if(nextProps.type == 'PROFILE_GET') {
            if(nextProps.status)
                this.setState({ 
                                full_name: nextProps.data.name,
                                email: nextProps.data.email,
                                mobile: nextProps.data.mobile,
                                username: nextProps.data.username, 
                                profile_image: nextProps.data.profile_image, 
                            });
        }

        console.log(nextProps);

        if(nextProps.type == 'UPLOAD_IMAGE') {
            if(nextProps.status)
                this.setState({ 
                    profile_image: nextProps.data, 
                });
        }

        if(nextProps.message)
            if(nextProps.message == 'Invalid token')
                this.props.history.push("/tadmin/logout");
    }

    backToIndex() {
        this.props.history.push("/tadmin/dashboard");
    }

    fileChangedHandler(e) {
        let file = e.target.files[0];
        // console.log(file);
        // this.setState({ profile_image: e.target.files[0] });

        var payload = new FormData();

        payload.append("file",e.target.files[0]);


        this.props.uploadImage('PROFILE-IMAGE',payload);
    }

    render() {
        const { classes, loader, message, status, data } = this.props;
        const { full_name, email, mobile, username, profile_image } = this.state;
        const bull = <span className={classes.bullet}>•</span>;
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
                                    Profile Update
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

                            </Grid>
                            <Grid  item xs={4}>

                            <img src={ Url.profile+profile_image } className="width-200" />
                            <br></br>
                            <input type="file" name="profile_image" onChange={this.fileChangedHandler} />
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
}

ProfileIndex.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    data: state.profile.data,
    loader: state.profile.loader,
    message: state.profile.message,
    status: state.profile.status,
    type: state.profile.type,
});

export default compose(
    withStyles(classes),
    connect(mapStateToProps, { getProfile, updateProfile, uploadImage })
  )(ProfileIndex);