import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { Header, Footer } from './Components/Layout';
import Login from './Components/Login';
import Routes from './Components/Routes';
import store from './store';

class App extends Component {

  constructor(props) {
    super(props);
    console.disableYellowBox = true;
  }
  render() {
    return (
      <Provider store={store}>
      <Fragment>
        <Routes />
        {/* <Header />

        <Footer/> */}
      </Fragment>
      </Provider>
    );
  }
}

export default App;
