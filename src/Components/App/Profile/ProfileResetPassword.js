import React, { Fragment, Component } from 'react';
import { withStyles, Card, CardActions, CardContent, Button, Grid, Typography, TextField, FormControl, CircularProgress, Select, MenuItem, FormHelperText } from '@material-ui/core';

import compose from 'recompose/compose';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

import { resetPassword } from './../../../Actions/ProfileActions';
import { Loader, Notification } from './../../Common';
import { AppHeader, MenuBar } from '../../Layout';
import classes from './classes';

import ReactNotification from "react-notifications-component";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


class ProfileResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            old_password:'',
            new_password:'',
            confirm_password:'',
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.backToIndex = this.backToIndex.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    onSubmit(e) {

        if(this.state.new_password == this.state.confirm_password) {
            const payload = { 
                new_password: this.state.new_password, 
            };

            this.props.resetPassword(payload);
        }
        else {
            alert("New password and confirm password does not match");
        }
        
        e.persist();
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type == 'PROFILE_RESET_PASSWORD') {
            if(nextProps.status){
                this.setState({ new_password: '', confirm_password:'' });
            }
        }

        if(nextProps.message)
            if(nextProps.message == 'Invalid token')
                this.props.history.push("/tadmin/logout");
    }

    backToIndex() {
        this.props.history.push("/tadmin/dashboard");
    }

    render() {
        const { classes, loader, message, status, data } = this.props;
        const { old_password, new_password, confirm_password } = this.state;
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
                                    Reset Password
                                </Typography>
                            </Grid>
                            <Grid item xs={2} className="text-a-c">
                                <Button type="submit" variant="contained" color="primary" className="padding-15 margin-r-5"> <i className="fa fa-save"></i> </Button>   
                                <Button type="button" onClick={this.backToIndex} variant="contained" className="padding-15"> <i className="fa fa-reply"></i> </Button>
                            </Grid>
                        </Grid>

                        <Grid container spacing={16}>
                            <Grid  item xs={4}>
                                {/* <FormControl fullWidth>
                                <TextValidator
                                    className="margin-b-35"
                                    label="Old Password"
                                    type="password"
                                    onChange={this.handleChange}
                                    name="old_password"
                                    value={old_password}
                                    validators={['required']}
                                    autoFocus
                                    errorMessages={['this field is required']}
                                />
                                </FormControl> */}
                                
                                <FormControl fullWidth>
                                <TextValidator
                                    className="margin-b-35"
                                    label="New Password"
                                    type="password"
                                    onChange={this.handleChange}
                                    name="new_password"
                                    value={new_password}
                                    autoFocus
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                </FormControl>

                                <FormControl fullWidth>
                                <TextValidator
                                    className="margin-b-35"
                                    label="Confirm Password"
                                    type="password"
                                    onChange={this.handleChange}
                                    name="confirm_password"
                                    value={confirm_password}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
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
}

ProfileResetPassword.propTypes = {
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
    connect(mapStateToProps, { resetPassword })
  )(ProfileResetPassword);