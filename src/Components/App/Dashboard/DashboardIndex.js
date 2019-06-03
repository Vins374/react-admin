import React, { Fragment, Component } from 'react';
import { AppHeader, MenuBar } from '../../Layout'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.min.css';
import classes from './classes';

import { pageAccessPermission } from './../../../Helpers/Session';
import AccessDenied from './../../AccessDenied';

class DashboardIndex extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
    }
    render() {
        const { classes } = this.props;
        const bull = <span className={classes.bullet}>•</span>;
        if(pageAccessPermission(this.props.location,'read')) {
            return (
                <Fragment>
                    <AppHeader />
                    
                    <Card className={classes.card}>
                        <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Dashboard
                        </Typography>
                        </CardContent>
                        </Card>

                </Fragment>
            )
        
        }
        else {
            return (
                <AccessDenied/>
            )
        }
    }
}

DashboardIndex.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(classes)(DashboardIndex);