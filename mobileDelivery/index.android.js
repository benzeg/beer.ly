/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


// Uses React Native Materials UI
// https://www.npmjs.com/package/react-native-material-ui


import React, { Component } from 'react';
import { AppRegistry } from 'react-native';

import {
  ThemeProvider,
  COLOR,
} from 'react-native-material-ui';

import App from './app/App.js';

// default UI Theme
const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

//
export default class mobileDelivery extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
          <App />
      </ThemeProvider>
    );
  }
}


AppRegistry.registerComponent('mobileDelivery', () => mobileDelivery);
