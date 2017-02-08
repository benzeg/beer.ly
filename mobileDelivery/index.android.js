/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


// Uses React Native Materials UI
// https://www.npmjs.com/package/react-native-material-ui


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {
  ThemeProvider,
  COLOR,
  ListItem,
  Toolbar
} from 'react-native-material-ui';

import Container from './app/components/Container.js';

// you can set your style right here, it'll be propagated to application
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
  componentDidMount() {
    
  }

  updateStatus(newStatus) {
    const USERNAME = 'boba';
    const PASSWORD = 'hunter2';

    const TEST_SERVER_ADDRESS = 'http://requestb.in/15ooxvh1';
    fetch(TEST_SERVER_ADDRESS, {
      method: 'POST',
      headers: {
        'Accept': 'applications/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: USERNAME,
        password: PASSWORD,
        status: newStatus
      })
    })
    .then(response => console.log('Response:', response))
    .catch(error=> console.log('Error:', error));
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <Container>
          <Toolbar
            leftElement="menu"
            centerElement="Beer.ly Delivered"
          />
          <ListItem
            divider
            centerElement={{
              primaryText: 'Delivery Job Accepted'
            }}
            onPress={()=>this.updateStatus('Delivery Job Accepted')}
          />
          <ListItem
            divider
            centerElement={{
              primaryText: 'Enroute to Supply Warehouse'
            }}
            onPress={()=>this.updateStatus('Enroute to Supply Warehouse')}
          />
          <ListItem
            divider
            centerElement={{
              primaryText: 'Loading Goods'
            }}
            onPress={()=>this.updateStatus('Loading Goods')}
          />
          <ListItem
            divider
            centerElement={{
              primaryText: 'Enroute to Customer'
            }}
            onPress={()=>this.updateStatus('Enroute to Customerd')}
          />
          <ListItem
            divider
            centerElement={{
              primaryText: 'Delivered to Customer'
            }}
            onPress={()=>this.updateStatus('Delivered to Customer')}
          />
        </Container>
      </ThemeProvider>
    );
  }
}

AppRegistry.registerComponent('mobileDelivery', () => mobileDelivery);
