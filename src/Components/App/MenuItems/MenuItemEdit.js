import React, { Fragment, Component } from 'react';
import { withStyles, Card, CardActions, CardContent, Button, Grid, Typography, TextField, FormControl, CircularProgress, Select } from '@material-ui/core';

import compose from 'recompose/compose';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'font-awesome/css/font-awesome.min.css';

import { pageAccessPermission, storeMenuItems } from './../../../Helpers/Session';
import AccessDenied from './../../AccessDenied';
import { getMainMenu, getSingleItem, editItem } from './../../../Actions/MenuItemActions';
import { Loader, Notification } from './../../Common';
import { AppHeader, MenuBar } from '../../Layout';
import classes from './classes';

import ReactNotification from "react-notifications-component";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

class MenuItemCreate extends Component {
    constructor(props) {
        super(props);
        const { match: { params } } = props;
        this.state = {
            menu_name:'',
            menu_url:'',
            menu_icon:'',
            sort_order:'0',
            main_menu:'',
            main_menu_list: [],
            menu_status: "1",
            menu_id: params.id,
        };
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.backToIndex = this.backToIndex.bind(this);
        this.notificationDOMRef = React.createRef();
        this.props.getMainMenu();
        this.props.getSingleItem(params.id);
    }

    onSubmit(e) {
        const payload = { 
                            menu_id: this.state.menu_id,
                            menu_name: this.state.menu_name, 
                            menu_url: this.state.menu_url,  
                            menu_icon: this.state.menu_icon, 
                            sort_order: this.state.sort_order, 
                            main_menu: this.state.main_menu, 
                            menu_status: this.state.menu_status, 
                        };
        this.props.editItem(payload);
        e.persist();
    }

    handleChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.type == 'EDIT_MENU_ITEMS') {
            if(nextProps.status)
                storeMenuItems(nextProps.data.menuItems);
                this.props.history.push("/tadmin/system/menu-items");
        }

        if(nextProps.type == 'GET_MAIN_MENUS')
            if(nextProps.status) {
                console.log(nextProps);
                this.setState({ main_menu_list:nextProps.data});
            }
        
            if(nextProps.type == 'GET_MENU_ITEM') {
                if(nextProps.status) {
                    this.setState({
                        menu_name: nextProps.data.menu_name, 
                        menu_url: nextProps.data.menu_url,  
                        menu_icon: nextProps.data.menu_icon, 
                        sort_order: nextProps.data.sort_order, 
                        main_menu: nextProps.data.parent_id, 
                        menu_status: nextProps.data.role_view, 
                    });
                }
            }
        
        if(nextProps.message)
            if(nextProps.message == 'Invalid token')
                this.props.history.push("/tadmin/logout");
    }

    backToIndex() {
        this.props.history.push("/tadmin/system/menu-items");
    }

    changeStatus(value) {
        // this.setState({ menu_status: value});
    }

    render() {
        const { classes, loader, message, status, data } = this.props;
        const { menu_name,menu_url, menu_icon, sort_order, menu_status, main_menu, main_menu_list } = this.state;
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
                                    Menu Item / Create
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
                                    label="Menu Name"
                                    onChange={this.handleChange}
                                    name="menu_name"
                                    value={menu_name}
                                    validators={['required']}
                                    autoFocus
                                    errorMessages={['this field is required']}
                                />
                                </FormControl>
                                
                                <FormControl fullWidth>
                                <TextValidator
                                    className="margin-b-35"
                                    label="Menu Url"
                                    onChange={this.handleChange}
                                    name="menu_url"
                                    value={menu_url}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                </FormControl>

                                <FormControl fullWidth>
                                <TextValidator
                                    className="margin-b-35"
                                    label="Menu Icon"
                                    onChange={this.handleChange}
                                    name="menu_icon"
                                    value={menu_icon}
                                />
                                </FormControl>

                                <FormControl fullWidth>
                                <TextValidator
                                    className="margin-b-35"
                                    label="Sort Order"
                                    onChange={this.handleChange}
                                    name="sort_order"
                                    value={sort_order}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                />
                                </FormControl>

                                <FormControl fullWidth>
                                <Select
                                    value={main_menu}
                                    onChange={this.handleChange}
                                    name="main_menu"
                                >

                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    
                                    { main_menu_list.map(menu => <MenuItem value={menu.admin_menu_id}> {menu.menu_name} </MenuItem>)} 

                                </Select>
                                <FormHelperText className="margin-b-35">Main Menu</FormHelperText>
                                </FormControl>

                                <FormControl fullWidth>
                                <Select
                                    value={menu_status}
                                    onChange={this.handleChange}
                                    name="menu_status"
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

MenuItemCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    data: state.menuItem.data,
    loader: state.menuItem.loader,
    message: state.menuItem.message,
    status: state.menuItem.status,
    type: state.menuItem.type
});

export default compose(
    withStyles(classes),
    connect(mapStateToProps, { getMainMenu, getSingleItem, editItem })
  )(MenuItemCreate);