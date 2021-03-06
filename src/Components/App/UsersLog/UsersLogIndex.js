import React, { Fragment, Component } from 'react';
import { withStyles, Card, CardActions, Grid, CardContent, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@material-ui/core';
import compose from 'recompose/compose';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDataItems, deleteItem } from '../../../Actions/UsersLogActions';
import { AppHeader, MenuBar } from '../../Layout'
import classes from './classes';

import { pageAccessPermission } from './../../../Helpers/Session';
import AccessDenied from './../../AccessDenied';

import ReactTable from "react-table";
import { Link } from 'react-router-dom'
import _ from "lodash";
import { stat } from 'fs';

import 'font-awesome/css/font-awesome.min.css';
import 'react-table/react-table.css';

const Header = [
  {
    title: "Select",
    key: "IsSelected",
    width: 60,
    sortable: false,
    filterable: false,
    Cell: row => (
      <div>
        <input 
          name={'name'+row.original.log_id}
          id={'id'+row.original.log_id}
          type="checkbox" 
          value={row.original.log_id}
          onChange={handleSelect} 
        />
      </div>
    )
},
  {
    Header: 'Admin Name',
    accessor: 'admin_name',
    Cell: row => (
      <div className="text-a-c">
        {row.value}
      </div>
    )
  },{
    Header: 'Log Message',
    accessor: 'log_msg',
    Cell: row => (
      <div className="text-a-c">
        {row.value}
      </div>
    )
  },{
    Header: 'Created At',
    accessor: 'created_at', 
    Cell: row => (
      <div className="text-a-c">
        {row.value}
      </div>
    )
  }
];

let idArray = [];

const handleSelect = (e) => {
  let index = idArray.indexOf(e.target.value);
 
  if (index > -1)
    idArray.splice(index, 1);
  else 
    idArray.push(e.target.value);
}

const requestData = (pageSize, page, sorted, filtered, respData) => {
    return new Promise((resolve, reject) => {
      let filteredData = respData;

      if (filtered.length) {
        filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
          return filteredSoFar.filter(row => {
            return (row[nextFilter.id] + "").includes(nextFilter.value);
          });
        }, filteredData);
      }
      
      const sortedData = _.orderBy(
        filteredData,
        sorted.map(sort => {
          return row => {
            if (row[sort.id] === null || row[sort.id] === undefined) {
              return -Infinity;
            }
            return typeof row[sort.id] === "string"
              ? row[sort.id].toLowerCase()
              : row[sort.id];
          };
        }),
        sorted.map(d => (d.desc ? "desc" : "asc"))
      );
  
      const res = {
        rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
        pages: Math.ceil(filteredData.length / pageSize)
      };

      // setTimeout(() => resolve(res), 500);
      resolve(res);
    });
  };

class UsersLogIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages: null,
            loading: true,
            open: false
        };

        this.fetchData = this.fetchData.bind(this);
        this.deleteItems = this.deleteItems.bind(this);
        this.handleDeleteClose = this.handleDeleteClose.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    }

    fetchData(state, instance) {
        this.setState({ loading: true,filtered: state.filtered, sorted: state.sorted });
        this.props.getDataItems(state);
    }

    deleteItems() {
      if(pageAccessPermission(this.props.location,'delete')) {
        this.setState({ open: true });
        // let payload = { ids: idArray };
        // this.props.deleteSettings(payload);
        // idArray = [];
      }
      else 
        alert("Sorry you dont have access to delete");
    }

    handleDeleteClose() {
      this.setState({ open: false });
    }

    handleDeleteSubmit() {
      let payload = { ids: idArray };
      this.props.deleteItem(payload);
      idArray = [];
      this.setState({ open: false });
    }

    componentWillReceiveProps(nextProps) {

      if(nextProps.type == 'USERS_LOG') {
        if(nextProps.status){
          this.setState({ data: nextProps.respData.table, pages: nextProps.respData.pages });
        }
      }

      if(nextProps.type == 'USERS_LOG_DELETE') {
        if(nextProps.status){
          this.setState({ data: nextProps.respData.table, pages: nextProps.respData.pages });
        }
      }

      if(nextProps.message)
        if(nextProps.message == 'Invalid token')
          this.props.history.push("/tadmin/logout");
    }

    render() {
        const { classes, respData, loader } = this.props;
        const { data, pages } = this.state;
        const bull = <span className={classes.bullet}>•</span>;

          if(pageAccessPermission(this.props.location,'read')) {
              return (
                  <Fragment>
                      <AppHeader />

                      <Card className={classes.card}>
                          <CardContent>

                            <Grid container spacing={16}>
                                <Grid item xs={10}>
                                  <Typography variant="h5" gutterBottom className="margin-b-25">
                                      Users Log
                                  </Typography>
                                </Grid>
                                <Grid item xs={2} className="text-a-c">
                                  <Button type="button" variant="contained" color="secondary" className="padding-15" onClick={this.deleteItems}> <i className="fa fa-trash"></i> </Button>
                                </Grid>
                            </Grid>

                            <ReactTable
                                manual
                                data={data}
                                columns={Header}
                                pages={pages} // Display the total number of pages
                                loading={loader} // Display the loading overlay when we need it
                                onFetchData={this.fetchData} // Request new data when things change
                                filterable
                                defaultPageSize={10}
                                className="-striped -highlight"
                            />

                          </CardContent>
                          </Card>

                          <Dialog
                          open={this.state.open}
                          onClose={this.handleLogoutClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure to delete entries?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={this.handleDeleteClose} color="primary">
                              Cancel
                            </Button>
                            <Button onClick={this.handleDeleteSubmit} color="primary" autoFocus>
                              Delete
                            </Button>
                          </DialogActions>
                        </Dialog>


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

UsersLogIndex.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    respData: state.usersLog.data,
    loader: state.usersLog.loader,
    message: state.usersLog.message,
    status: state.usersLog.status,
    type: state.usersLog.type
});

export default compose(
    withStyles(classes),
    connect(mapStateToProps, { getDataItems, deleteItem })
  )(UsersLogIndex);