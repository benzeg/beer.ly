import React from 'react';

import { View, Text } from 'react-native';
import { Toolbar } from 'react-native-material-ui';

import _ from 'lodash';
import update from 'immutability-helper';
import RNFetchBlob from 'react-native-fetch-blob';

import { SERVER_ADDRESS, USERNAME, PASSWORD } from './config/ServerConfig.js';

import PendingJobListLayout from './layouts/PendingJobListLayout.js';
import ActiveJobDashBoardLayout from './layouts/ActiveJobDashBoardLayout.js';
import DeliveryStatusUpdateOptionsList from './components/DeliveryStatusUpdateOptionsList.js';
import RemoveWarehouseWaypointList from './components/RemoveWarehouseWaypointList.js';

import LocationTracker from './components/LocationTracker.js';

import Container from './components/Container.js';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: USERNAME,
      password: PASSWORD,

      location: {
        latitude: 37.78825,
        longitude: -122.4324
      },

      activeJob: null,
      pendingJobs: [],
      deliveryStatus: 'No Job Active',

      isSelectingUpdatedJobStatus: false,
      isSelectingWareHouseAddressToRemove: false,
      isFetchingPendingJobs: true,
      activeLayout: 'PendingJobList'
    };

    // This debounced version of the jobstatus update is used for the geolocation update to the server
    this.updateServerWithLocation = _.debounce(this.handleJobStatusUpdateSelect, 2000);
  }

  // The App fetching pending jobs from the server before it renders
  componentWillMount() {
    this.fetchPendingJobs();
  }

  fetchPendingJobs = () => {
    RNFetchBlob.config({
      trusty: true,
    })
    .fetch('GET', SERVER_ADDRESS + '/driver/deliveries?username=' + this.state.username + '&password=' + this.state.password)
    .then((response) => {
      let newPendingJobs = response.json();
      console.log(newPendingJobs);
      
      // If we have no pending job...
      if (newPendingJobs.length === 1 && newPendingJobs[0] === null) {
        newPendingJobs = [];
      } else {
      // We JSON.parse the supplyAddress due to the way the server provides it to us
        newPendingJobs.forEach(job => {
          job.supplyAddresses = JSON.parse(job.supplyAddresses);
        });
      }

      this.setState({
        isFetchingPendingJobs: false,
        pendingJobs: newPendingJobs
      });
    })
    .catch((error, statusCode) => {
      // this.setState({
      //   pendingJobs: []
      // });
      console.warn('Fetching Pending Jobs Error: ', statusCode, error);
    });
  }

  handleJobStatusUpdateSelect = (newStatus) => {
    // If the delivery driver is switching his/her status to "loading goods" for the first time
    // we want to show the modal dialog for them to remove a warehouse waypoint
    if (newStatus === 'Loading Goods' && this.state.deliveryStatus !== 'Loading Goods') {
      this.setState({
        isSelectingWareHouseAddressToRemove: true
      });
    }

    // Note that newStatus === null is passed when the delivery driver press 'back' or 'cancel'
    // on the delivery status change dialog modal
    this.setState({
      deliveryStatus: newStatus !== null ? newStatus : this.state.deliveryStatus,
      isSelectingUpdatedJobStatus: false
    },
    () => {
      RNFetchBlob.config({
        trusty: true,
      })
      .fetch('POST', SERVER_ADDRESS + '/driver/deliveryStatus', {
          'Accept': 'applications/json',
          'Content-Type': 'application/json'
        },
        JSON.stringify({
          username: this.state.username,
          password: this.state.password,
          jobid: this.state.activeJob.id,
          deliveryStatus: newStatus,
          latitude: this.state.location.latitude,
          longitude: this.state.location.longitude
        })
      )
      .then((response) => {
        // If the delviery status is "delivered", we show the pending job pages again
        if (this.state.deliveryStatus === 'Delivered to Customer') {
          this.fetchPendingJobs();
          this.setState({
            activeLayout: 'PendingJobList'
          });
        }
      })
      .catch(error=> console.warn('Updating Delivery Status to Server Error:', error));
    });
  }

  // This method is called whenever the GPS provides updated geoLocation information
  handleLocationChange = (newLocation) => {
    this.setState({
      location: newLocation
    },
    () => {
      this.updateServerWithLocation(this.state.deliveryStatus);
    });
  }

  // This method is called when delivery driver update their status to "Loading Goods"
  // and select the brewery / warehouse location that he arrived at.
  // It remove the selected warehouse location from the waypoint in the active dashboard
  handleArriveAtWarehouse = (warehouseAddress) => {
    let revisedWarehouseAddresses = this.state.activeJob.supplyAddresses.slice();

    revisedWarehouseAddresses.splice(revisedWarehouseAddresses.indexOf(warehouseAddress), 1);

    let newState = update(this.state, {
      activeJob: {supplyAddresses: {$set: revisedWarehouseAddresses}}
    });

    this.setState(newState);
    this.setState({
      isSelectingWareHouseAddressToRemove: false
    });
  }

  // This method is called when the delivery driver selects a pending delivery job to take
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

  // This method change app state to prompt the rendering of the delviery status update modal
  handleJobStatusUpdateClick = () => {
    this.setState({
      isSelectingUpdatedJobStatus: true
    });
  }


  render() {
    return (
      <View style={{flex: 1}}>

        {this.state.activeLayout === 'PendingJobList' && this.state.isFetchingPendingJobs &&
          <Text>Loading Pending Jobs</Text>
        }

        {this.state.activeLayout === 'PendingJobList' &&
          <PendingJobListLayout 
            jobList={this.state.pendingJobs} 
            onJobPress={this.handleJobSelect}
            onPendingJobListRefresh={this.fetchPendingJobs} />
        }

        {this.state.activeLayout === 'ActiveJobDashBoard' &&
          <Container>
            <Toolbar
              leftElement="menu"
              centerElement="Beer.ly Delivered"/>

            <LocationTracker onLocationChange={this.handleLocationChange}/>

            <ActiveJobDashBoardLayout
              job={this.state.activeJob}
              supplyAddresses={this.state.activeJob.supplyAddresses}
              location={this.state.location}
              deliveryStatus={this.state.deliveryStatus}
              onJobStatusUpdateClick={this.handleJobStatusUpdateClick}/>

          </Container>
        }

        {this.state.isSelectingUpdatedJobStatus &&
          <DeliveryStatusUpdateOptionsList onStatusUpdate={this.handleJobStatusUpdateSelect}/>
        }

        {this.state.isSelectingWareHouseAddressToRemove &&
          <RemoveWarehouseWaypointList
            supplyAddresses={this.state.activeJob.supplyAddresses}
            onArrivedAtWarehouse={this.handleArriveAtWarehouse} />
        }

      </View>
    );
  }
}

export default App;
