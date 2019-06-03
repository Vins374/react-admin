import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import {Avatar,Button,CssBaseline,FormControl,FormControlLabel,Checkbox,Input,InputLabel,Typography,withStyles,Paper} from '@material-ui/core';
import { Header,Footer } from './Layout'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import classes from './Css/LoginRegisterCss'

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.gotoLogin = this.gotoLogin.bind(this);
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        const user = { 
            email: this.state.email,
            password: this.state.password
        }
        // this.props.loginUser(user);
    }

    gotoLogin()
    {
        this.props.history.push('/');
    }

    render() {
        const { classes }  = this.props;
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
                Register
                </Typography>
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
                {/* <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                /> */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Register
                </Button>

                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="default"
                    className={classes.submit}
                    onClick={this.gotoLogin}
                >
                    Login
                </Button>
                </form>
            </Paper>
            </main>
            </Fragment>
        );
    }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(classes)(Register);