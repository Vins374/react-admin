import React, { Fragment, Component } from 'react';
import { withStyles, Card, CardActions, CardContent, Button, Grid, Typography, TextField, FormControl, CircularProgress } from '@material-ui/core';

import compose from 'recompose/compose';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

import { pageAccessPermission } from './../../../Helpers/Session';
import AccessDenied from './../../AccessDenied';
import { createSettings } from './../../../Actions/SettingsActions';
import { Loader, Notification } from './../../Common';
import { AppHeader, MenuBar } from '../../Layout';
import classes from './classes';

import ReactNotification from "react-notifications-component";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';


class SettingsCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setting_name:'',
            setting_value:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.backToIndex = this.backToIndex.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    onSubmit(e) {
        const payload = { setting_name: this.state.setting_name, setting_value: this.state.setting_value };
        this.props.createSettings(payload);
        e.persist();
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type == 'CREATE_SETTINGS') {
            if(nextProps.status)
                this.props.history.push("/tadmin/system/settings");
        }

        if(nextProps.message)
            if(nextProps.message == 'Invalid token')
                this.props.history.push("/tadmin/logout");
    }

    backToIndex() {
        this.props.history.push("/tadmin/system/settings");
    }

    render() {
        const { classes, loader, message, status, data } = this.props;
        const { setting_name,setting_value } = this.state;
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
                                    Settings / Create
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
                                    label="Setting Name"
                                    onChange={this.handleChange}
                                    name="setting_name"
                                    value={setting_name}
                                    validators={['required']}
                                    autoFocus
                                    errorMessages={['this field is required']}
                                />
                                </FormControl>
                                
                                <FormControl fullWidth>
                                <TextValidator
                                    className="margin-b-35"
                                    label="Setting Value"
                                    onChange={this.handleChange}
                                    name="setting_value"
                                    value={setting_value}
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
        else {
            return (
                <AccessDenied />
            )
        }
    }
}

SettingsCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    data: state.settings.data,
    loader: state.settings.loader,
    message: state.settings.message,
    status: state.settings.status,
    type: state.settings.type
});

export default compose(
    withStyles(classes),
    connect(mapStateToProps, { createSettings })
  )(SettingsCreate);