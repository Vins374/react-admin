import React, { Fragment, Component } from 'react';
import { AppHeader, Header, MenuBar } from './Layout'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import 'font-awesome/css/font-awesome.min.css';
import { getToken } from '../Helpers/Session';

class Error404 extends Component {
    constructor(props) {
        super(props);
        // console.log(this.props);
    }

    renderHeader()
    {
        if(getToken() == "null" || getToken() == null || getToken() == '' || getToken() == false ) {
            return(
                <Header/>
                );
        }
        else {
            return (
                <AppHeader />
            );
        }
    }
    
    render() {
        return (
            <Fragment>
                {this.renderHeader()}
                <Card className="margin-25">
                    <CardContent>
                    <Typography variant="h5" gutterBottom>
                        404 Page Not Found 
                    </Typography>
                    </CardContent>
                    </Card>
            </Fragment>
        )
    }
}
  
export default Error404;