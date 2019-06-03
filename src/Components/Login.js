import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {Avatar,Button,CssBaseline,FormControl,FormControlLabel,Checkbox,Input,InputLabel,Typography,withStyles,Paper} from '@material-ui/core';
import { Header,Footer } from './Layout'
import { Loader, Notification } from './Common'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import classes from './Css/LoginRegisterCss'
import compose from 'recompose/compose';
import{ connect } from 'react-redux';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { storeToken, storeMenuItems, storeUserData } from '../Helpers/Session';

// import { history } from '../Helpers';

import { loginUser } from '../Actions/LoginRegisterActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.gotoRegister = this.gotoRegister.bind(this);
        this.addNotification = this.addNotification.bind(this);
        this.notificationDOMRef = React.createRef();
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const user = { 
            username: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(user);
    }

    addNotification() {
        this.notificationDOMRef.current.addNotification({
          title: "Awesomeness",
          message: "Awesome Notifications!",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: { duration: 2000 },
          dismissable: { click: true }
        });
      }    

    gotoRegister()
    {
        this.props.history.push('/register');
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type == 'USER_LOGIN') {
            storeToken(nextProps.user.data.token);
            storeMenuItems(nextProps.user.data.menuItems);
            storeUserData(nextProps.user.data);
            this.props.history.push("/tadmin/dashboard");
        }
    }

    render() {
        const { classes, loader, message, status, user }  = this.props;

        // this.userLoginRedirect(user);

        return (
            <Fragment>
            <Header/>
            <main className={classes.main}>
            <CssBaseline />
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Login
                </Typography>
                { loader && <Loader /> }
                <form className={classes.form} onSubmit={this.onSubmit}>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="email">Email Address</InputLabel>
                    <Input id="email" name="email" autoComplete="email" autoFocus 
                    onChange={this.onChange} 
                    value={this.state.email}
                    />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input name="password" type="password" id="password" autoComplete="current-password" 
                    onChange={this.onChange} 
                    value={this.state.password}
                    />
                </FormControl>
                { message && <Notification type={status} message={message} elementRef={this.notificationDOMRef} /> }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Login
                </Button>

                {/* <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="default"
                    className={classes.submit}
                    onClick={this.gotoRegister}
                >
                    Register
                </Button> */}

                <ReactNotification ref={this.notificationDOMRef} />

                </form>
            </Paper>
            </main>
            </Fragment>
        );
    }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.user.loginData,
    loader: state.user.loader,
    message: state.user.message,
    status: state.user.status,
    type: state.user.type
});

// export default withStyles(classes)(Login);

export default compose(
    withStyles(classes),
    connect(mapStateToProps, { loginUser })
  )(Login);

// export default connect(mapStateToProps, { loginUser })(Login);