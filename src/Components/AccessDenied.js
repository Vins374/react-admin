import React, { Fragment, Component } from 'react';
import { AppHeader, Header } from './Layout'
import {Card, CardContent, Typography } from '@material-ui/core';
import 'font-awesome/css/font-awesome.min.css';
import { getToken } from '../Helpers/Session';

class AccessDenied extends Component {

    renderHeader()
    {
        if(getToken() === "null" || getToken() === null || getToken() === '' || getToken() === false ) {
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
                        303 Access Denied
                    </Typography>
                    </CardContent>
                    </Card>
            </Fragment>
        )
    }
}
  
export default AccessDenied;