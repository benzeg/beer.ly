import React from 'react';

import { SERVER_ADDRESS } from './config/ServerConfig.js';
import Container from './components/Container.js';
import DeliveryStatusUpdateOptionsList from './components/DeliveryStatusUpdateOptionsList.js';
import LocationTracker from './components/LocationTracker.js';

import { Toolbar } from 'react-native-material-ui';
import { ActionButton } from 'react-native-material-ui';
import { ListItem } from 'react-native-material-ui';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {},
      deliveryStatus: 'No Job Active',
      isSelectingUpdatedJobStatus: false
    };
  }

  handleStatusUpdate = (newStatus) => {
    const USERNAME = 'boba';
    const PASSWORD = 'hunter2';
    const JOBID = 'job123';

    const TEST_SERVER_ADDRESS = SERVER_ADDRESS;

    fetch(TEST_SERVER_ADDRESS, {
      method: 'POST',
      headers: {
        'Accept': 'applications/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: USERNAME,
        password: PASSWORD,
        jobid: JOBID,
        status: newStatus,
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude
      })
    })
    .then(response => console.log('Response:', response))
    .catch(error=> console.log('Error:', error));
  }

  handleLocationChange = (newLocation) => {
    this.setState({
      location: newLocation
    });
  }

  render() {
    return(
      <Container>
        <Toolbar
          leftElement="menu"
          centerElement="Beer.ly Delivered"
        />


        {this.state.isSelectingUpdatedJobStatus && 
          <DeliveryStatusUpdateOptionsList onStatusUpdate={this.handleStatusUpdate}/>
        }

        <LocationTracker onLocationChange={this.handleLocationChange}/>

        <ListItem
          divider
          centerElement={{
            primaryText: this.state.deliveryStatus
          }}
          onPress={()=> this.setState({isSelectingUpdatedJobStatus: !this.state.isSelectingUpdatedJobStatus})}
        />
      </Container>
    );
  }
}

export default App;
