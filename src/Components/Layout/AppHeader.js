import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuBar from './MenuBar'
import { IconButton, Grid, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Drawer }from '@material-ui/core';
import { List, Divider, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, AppBar,Toolbar,Typography,withStyles }from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { getLoginData } from './../../Helpers/Session';

const classes = {
    root: {
      flexGrow: 1,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  };

class AppHeader extends Component {

    constructor(props) {
        super(props);
        // console.log(props);
        // console.log(history);

        // console.log(getLoginData());
    }

    state = {
        auth: true,
        open: false,
        anchorEl: null,
        user: getLoginData()
      };

      gotoPage = (url) => event => {
        console.log(url)
      }
    
      handleChange = event => {
        this.setState({ auth: event.target.checked });
      };
    
      handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

      logout = () => {
        this.setState({ anchorEl: null });
        this.props.history.push("/");
      };

      handleLogoutClose = () => {
        console.log("logout close");
        this.setState({ open: false,anchorEl: null });
      };

      handleClickOpen = () => {
        this.setState({ open: true });
      };

      toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };

    render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
        return (
            <div>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
                </IconButton>

                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div
                    tabIndex={0}
                    role="button"
                    // onClick={this.toggleDrawer('left', false)}
                    // onKeyDown={this.toggleDrawer('left', false)}
                >
                    <MenuBar history={this.props.history} onMenuPress={this.toggleDrawer('left',false)} />
                </div>
                </Drawer>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                    App
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="h6" color="inherit" className="text-a-r">
                      {this.state.user.user.name}
                    </Typography>
                  </Grid>

                </Grid>
                

                <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <Link className="link" to="/tadmin/profile"><MenuItem 
                   onClick={this.handleClose}
                   >Profile</MenuItem></Link>
                   <Link className="link" to="/tadmin/reset-password"><MenuItem 
                   onClick={this.handleClose}
                   >Reset Password</MenuItem></Link>
                  <MenuItem onClick={this.handleClickOpen}> Logout </MenuItem>
                </Menu>
              </div>

                  <Dialog
                  open={this.state.open}
                  onClose={this.handleLogoutClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Logout?"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure to logout?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleLogoutClose} color="primary">
                      Cancel
                    </Button>
                    <Link className="link" to="/tadmin/logout"><Button onClick={this.handleLogoutClose} color="primary" autoFocus>
                      Logout 
                    </Button> </Link>
                  </DialogActions>
                </Dialog>

                </Toolbar>
            </AppBar>
            </div>
        );
    }
}

AppHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};
  

export default withStyles(classes)(AppHeader);