import React, { Fragment, Component } from 'react';
import { CircularProgress, Card, CardContent, Typography, withStyles, Grid } from '@material-ui/core';
import { Header } from './../Layout';
import compose from 'recompose/compose';
import classes from './Settings/classes';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearStorage } from './../../Helpers/Session';
import { logout } from './../../Actions/LoginRegisterActions';

class Logout extends Component {
    constructor(props) {
        super(props);

        clearStorage('token');
        clearStorage('menuData');

        
    }

    componentDidMount() {
        console.log("coming");
        this.props.logout();
        // this.props.history.push('/');
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.type);
        if(nextProps.type == 'LOGOUT') {
            this.props.history.push("/");
        }
    }

    render() {

        return (
            <Fragment>
                <Header/>

                <Card className="margin-25">
                    <CardContent>
                        <Grid container spacing={16}>
                            <Grid item xs={1}>
                                <CircularProgress className="margin-t-15"/>
                            </Grid>
                            <Grid item xs={11}>
                                <Typography variant="h5" gutterBottom className="margin-t-15">
                                    Please wait....
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Fragment>
        );
    }
}

Logout.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    loader: state.user.loader,
    message: state.user.message,
    status: state.user.status,
    type: state.user.type
});

export default compose(
    withStyles(classes),
    connect(mapStateToProps, { logout })
  )(Logout);