import React, { Fragment, Component } from 'react';
import { withStyles, Card, CardActions, Grid, CardContent, Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle  } from '@material-ui/core';
import compose from 'recompose/compose';
import{ connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getSettings, deleteSettings } from '../../../Actions/SettingsActions';
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
          name={'name'+row.original.setting_id}
          id={'id'+row.original.setting_id}
          type="checkbox" 
          value={row.original.setting_id}
          onChange={handleSelect} 
        />
      </div>
    )
},
  {
    Header: 'Setting Name',
    accessor: 'setting_name',
    Cell: row => (
      <div className="text-a-c">
        {row.value}
      </div>
    )
  },{
    Header: 'Setting Value',
    accessor: 'setting_value',
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
  },
  {
    Header: 'Action',
    accessor: 'action',
    sortable: false,
    filterable: false,
    Cell: row => (
        <div className="text-a-c">
            <Link to={`/tadmin/system/settings/edit/${row.original.setting_id}`}> <Button type="button" variant="contained" className="marginR5" color="primary"> <i className="fa fa-edit"></i> </Button> </Link>
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

class SettingsIndex extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            pages: null,
            loading: true,
            open: false
        };

        this.fetchData = this.fetchData.bind(this);
        this.gotoSettingCreate = this.gotoSettingCreate.bind(this);
        this.deleteItems = this.deleteItems.bind(this);
        this.handleDeleteClose = this.handleDeleteClose.bind(this);
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
    }

    fetchData(state, instance) {
        this.setState({ loading: true,filtered: state.filtered, sorted: state.sorted });
        this.props.getSettings(state);
    }

    gotoSettingCreate() {
      this.props.history.push('/tadmin/system/settings/create');
    }

    deleteItems() {
      if(pageAccessPermission(this.props.location,'delete')) {
        this.setState({ open: true });
      }
      else 
        alert("Sorry you dont have access to delete");
    }

    handleDeleteClose() {
      this.setState({ open: false });
    }

    handleDeleteSubmit() {
      let payload = { ids: idArray };
      this.props.deleteSettings(payload);
      idArray = [];
      this.setState({ open: false });
    }

    componentWillReceiveProps(nextProps) {

      if(nextProps.type == 'SETTINGS'){
        if(nextProps.status){
          this.setState({ data: nextProps.respData.table, pages: nextProps.respData.pages });
        }
      }

      if(nextProps.type == 'DELETE_SETTINGS') {
        if(nextProps.status){
          this.setState({ data: nextProps.respData.table, pages: nextProps.respData.pages });
        }
      }

      if(nextProps.message)
        if(nextProps.message == 'Invalid token')
          this.props.history.push("/tadmin/logout");
    }

    render() {
        const { classes, loader, status } = this.props;
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
                                      Settings
                                  </Typography>
                                </Grid>
                                <Grid item xs={2} className="text-a-c">
                                  <Button type="button" variant="contained" color="primary" className="marginR5 padding-15" onClick={this.gotoSettingCreate}> <i className="fa fa-plus"></i> </Button>
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

SettingsIndex.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    respData: state.settings.data,
    loader: state.settings.loader,
    message: state.settings.message,
    status: state.settings.status,
    type: state.settings.type
});

export default compose(
    withStyles(classes),
    connect(mapStateToProps, { getSettings, deleteSettings })
  )(SettingsIndex);