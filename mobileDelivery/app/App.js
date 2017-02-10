import React from 'react';

import { View } from 'react-native';
import { Toolbar } from 'react-native-material-ui';

import _ from 'lodash';

import { SERVER_ADDRESS, USERNAME, PASSWORD } from './config/ServerConfig.js';

import PendingJobListLayout from './layouts/PendingJobListLayout.js';
import ActiveJobDashBoardLayout from './layouts/ActiveJobDashBoardLayout.js';
import DeliveryStatusUpdateOptionsList from './components/DeliveryStatusUpdateOptionsList.js';

import Container from './components/Container.js';
import LocationTracker from './components/LocationTracker.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: {
        latitude: 37.78825,
        longitude: -122.4324
      },

      activeJob: null,
      deliveryStatus: 'No Job Active',

      isSelectingUpdatedJobStatus: false,
      activeLayout: 'PendingJobList'
    };

    this.updateServerWithLocation = _.debounce(this.handleJobStatusUpdateSelect, 300);
  }

  handleJobStatusUpdateSelect = (newStatus) => {
    this.setState({
      deliveryStatus: newStatus !== null ? newStatus : this.state.deliveryStatus,
      isSelectingUpdatedJobStatus: false
    },
    () => {
      fetch(SERVER_ADDRESS, {
        method: 'POST',
        headers: {
          'Accept': 'applications/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: USERNAME,
          password: PASSWORD,
          jobid: this.state.activeJob.id,
          deliveryStatus: newStatus,
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude
        })
      })
      .then((response) => {
        if (this.state.deliveryStatus === 'Delivered to Customer') {
          this.setState({
            activeLayout: 'PendingJobList'
          });
        }
        console.log('Response:', response);
      })
      .catch(error=> console.log('Error:', error));
    });
  }

  handleLocationChange = (newLocation) => {
    this.setState({
      location: newLocation
    },
    () => {
      this.updateServerWithLocation(this.state.deliveryStatus);
    });
  }

  handleJobSelect = (newJob) => {
    this.setState({
      activeJob: newJob,
      deliveryStatus: 'Delivery Job Accepted',
      activeLayout: 'ActiveJobDashBoard'
    },
      // We need to update the server to notify it of the job being accepted
      () => this.handleJobStatusUpdateSelect('Delivery Job Accepted')
    );
  }

  handleJobStatusUpdateClick = () => {
    this.setState({
      isSelectingUpdatedJobStatus: true
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.activeLayout === 'PendingJobList' &&
          <PendingJobListLayout onJobPress={this.handleJobSelect}/>
        }

        {this.state.activeLayout === 'ActiveJobDashBoard' &&
          <Container>
            <Toolbar
              leftElement="menu"
              centerElement="Beer.ly Delivered"/>

            <LocationTracker onLocationChange={this.handleLocationChange}/>

            <ActiveJobDashBoardLayout
              location={this.state.location}
              deliveryStatus={this.state.deliveryStatus}
              onJobStatusUpdateClick={this.handleJobStatusUpdateClick}/>

          </Container>
        }

        {this.state.isSelectingUpdatedJobStatus &&
          <DeliveryStatusUpdateOptionsList onStatusUpdate={this.handleJobStatusUpdateSelect}/>
        }

      </View>
    );
  }
}

export default App;
